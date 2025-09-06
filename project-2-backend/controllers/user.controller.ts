import { Request, Response } from "express";
import AccountUser from "../models/account-user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AccountRequest } from "../interfaces/request.interface";
import CV from "../models/cv.model";
import Job from "../models/job.model";
import AccountCompany from "../models/account-company.model";

export const registerPost = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const existAccount = await AccountUser.findOne({
    email: email
  });

  if(existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    });
    return;
  }

  // Mã hóa mật khẩu với bcrypt
  const salt = await bcrypt.genSalt(10); // Tạo salt - Chuỗi ngẫu nhiên có 10 ký tự
  const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa mật khẩu

  const newAccount = new AccountUser({
    fullName: fullName,
    email: email,
    password: hashedPassword
  });

  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công!"
  })
}

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existAccount = await AccountUser.findOne({
    email: email
  });

  if(!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, `${existAccount.password}`); // chuyển existAccount.password sang string
  if(!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!"
    });
    return;
  }

  // Tạo JWT
  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: '1d' // Token có thời hạn 1 ngày
    }
  )

  // Lưu token vào cookie
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // Token có hiệu lực trong 1 ngày
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false, // false: http, true: https
    sameSite: "lax" // Cho phép gửi cookie giữa các domain
  })

  res.json({
    code: "success",
    message: "Đăng nhập thành công!",
  });
}

export const profilePatch = async (req: AccountRequest, res: Response) => {
  if(req.file) {
    req.body.avatar = req.file.path;
  } else {
    delete req.body.avatar; // nếu không có file thì xóa trường avatar trong req.body
  }

  await AccountUser.updateOne({
    _id: req.account.id
  }, req.body);

  res.json({
    code: "success",
    message: "Cập nhật thành công!"
  })
}

export const listCV = async (req: AccountRequest, res: Response) => {
  const userEmail = req.account.email;

  const listCV = await CV
    .find({
      email: userEmail
    })
    .sort({
      createdAt: "desc"
    })

  const dataFinal = [];

  for (const item of listCV) {
    const dataItemFinal = {
      id: item.id,
      jobTitle: "",
      companyName: "",
      jobSalaryMin: 0,
      jobSalaryMax: 0,
      jobPosition: "",
      jobWorkingForm: "",
      status: item.status,
    };

    const infoJob = await Job.findOne({
      _id: item.jobId
    })

    if(infoJob) {
      dataItemFinal.jobTitle = `${infoJob.title}`;
      dataItemFinal.jobSalaryMin = parseInt(`${infoJob.salaryMin}`);
      dataItemFinal.jobSalaryMax = parseInt(`${infoJob.salaryMax}`);
      dataItemFinal.jobPosition = `${infoJob.position}`;
      dataItemFinal.jobWorkingForm = `${infoJob.workingForm}`;

      const infoCompany = await AccountCompany.findOne({
        _id: infoJob.companyId
      })

      if(infoCompany) {
        dataItemFinal.companyName = `${infoCompany.companyName}`;
        dataFinal.push(dataItemFinal);
      }
    }
  }

  res.json({
    code: "success",
    message: "Lấy danh sách CV thành công!",
    listCV: dataFinal
  })
}

export const detailCV = async (req: AccountRequest, res: Response) => {
  try {
    const cvId = req.params.id;

    const infoCV = await CV.findOne({
      _id: cvId
    })

    if(!infoCV) {
      res.json({
        code: "error",
        message: "Id không hợp lệ!"
      });
      return;
    }

    const infoJob = await Job.findOne({
      _id: infoCV.jobId
    })

    if(!infoJob) {
      res.json({
        code: "error",
        message: "Không có quyền truy cập!"
      });
      return;
    }

    const dataFinalCV = {
      fullName: infoCV.fullName,
      email: infoCV.email,
      phone: infoCV.phone,
      fileCV: infoCV.fileCV,
    };

    const dataFinalJob = {
      id: infoJob.id,
      title: infoJob.title,
      salaryMin: infoJob.salaryMin,
      salaryMax: infoJob.salaryMax,
      position: infoJob.position,
      workingForm: infoJob.workingForm,
      technologies: infoJob.technologies,
    };
    console.log(dataFinalCV, dataFinalJob);
    res.json({
      code: "success",
      message: "Thành công!",
      infoCV: dataFinalCV,
      infoJob: dataFinalJob
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}
