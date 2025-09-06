import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import AccountCompany from "../models/account-company.model";
import jwt from "jsonwebtoken";
import { AccountRequest } from "../interfaces/request.interface";
import Job from "../models/job.model";
import City from "../models/city.model";
import CV from "../models/cv.model";

export const registerPost = async (req: Request, res: Response) => {
  const { companyName, email, password } = req.body;

  const existAccount = await AccountCompany.findOne({
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

  const newAccount = new AccountCompany({
    companyName: companyName,
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

  const existAccount = await AccountCompany.findOne({
    email: email
  });

  if(!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, `${existAccount.password}`);
  if(!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!"
    });
    return;
  }

  // Tạo JWT
  const token = jwt.sign(   // sign: 3 tham số: payload: có thể là dạng chuỗi, object, buffer(file ảnh được chuyển thành buffer), secret: bí mật để mã hóa token, options: thời gian hết hạn của token
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
    req.body.logo = req.file.path;
  } else {
    delete req.body.logo;
  }

  await AccountCompany.updateOne({
    _id: req.account.id
  }, req.body);

  res.json({
    code: "success",
    message: "Cập nhật thành công!"
  })
}

export const createJobPost = async (req: AccountRequest, res: Response) => {
  req.body.companyId = req.account.id;
  req.body.salaryMin = req.body.salaryMin ? parseInt(req.body.salaryMin) : 0;
  req.body.salaryMax = req.body.salaryMax ? parseInt(req.body.salaryMax) : 0;
  req.body.technologies = req.body.technologies ? req.body.technologies.split(", ") : [];
  req.body.images = [];

  // Xử lý mảng images
  if (req.files) {
    for (const file of req.files as any[]) {
      req.body.images.push(file.path);
    }
  }

  const newRecord = new Job(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo công việc thành công!"
  })
}

export const listJob = async (req: AccountRequest, res: Response) => {
  const find = {
      companyId: req.account.id
  };
  // Phân trang
  const limitItems = 2;
  let page = 1;
  if(req.query.page) {
    const currentPage = parseInt(`${req.query.page}`);
    if(currentPage > 0) {
      page = currentPage;
    }
  }
  const totalRecord = await Job.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItems);
  if(page > totalPage && totalPage != 0) {
    page = totalPage;
  }
  const skip = (page - 1) * limitItems;
  // Hết Phân trang

  const jobs = await Job
    .find(find)
    .sort({
      createdAt: "desc"
    })
    .limit(limitItems)
    .skip(skip);

    
  const dataFinal = [];

  const city = await City.findOne({
    _id: req.account.city
  })

  for (const item of jobs) {
    dataFinal.push({
      id: item.id,
      companyLogo: req.account.logo,
      title: item.title,
      companyName: req.account.companyName,
      salaryMin: item.salaryMin,
      salaryMax: item.salaryMax,
      position: item.position,
      workingForm: item.workingForm,
      companyCity: city?.name,
      technologies: item.technologies,
    });
  }

  res.json({
    code: "success",
    message: "Lấy danh sách công việc thành công!",
    jobs: dataFinal,
    totalPage: totalPage
  })
}

export const editJob = async (req: AccountRequest, res: Response) => {
  try {
    const id = req.params.id;

    const jobDetail = await Job.findOne({
      _id: id,
      companyId: req.account.id
    })

    if(!jobDetail) {
      res.json({
        code: "error",
        message: "Id không hợp lệ!"
      })
      return;
    }

    res.json({
      code: "success",
      message: "Thành công!",
      jobDetail: jobDetail
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

export const editJobPatch = async (req: AccountRequest, res: Response) => {
  try {
    const id = req.params.id;

    const jobDetail = await Job.findOne({
      _id: id,
      companyId: req.account.id
    })

    if(!jobDetail) {
      res.json({
        code: "error",
        message: "Id không hợp lệ!"
      })
      return;
    }

    req.body.salaryMin = req.body.salaryMin ? parseInt(req.body.salaryMin) : 0;
    req.body.salaryMax = req.body.salaryMax ? parseInt(req.body.salaryMax) : 0;
    req.body.technologies = req.body.technologies ? req.body.technologies.split(", ") : [];
    req.body.images = [];

    // Xử lý mảng images
    if (req.files) {
      for (const file of req.files as any[]) {
        req.body.images.push(file.path);
      }
    }

    await Job.updateOne({
      _id: id,
      companyId: req.account.id
    }, req.body)

    res.json({
      code: "success",
      message: "Cập nhật thành công!"
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

export const deleteJobDel = async (req: AccountRequest, res: Response) => {
  try {
    const id = req.params.id;

    const jobDetail = await Job.findOne({
      _id: id,
      companyId: req.account.id
    })

    if(!jobDetail) {
      res.json({
        code: "error",
        message: "Id không hợp lệ!"
      })
      return;
    }

    await Job.deleteOne({
      _id: id,
      companyId: req.account.id
    })

    res.json({
      code: "success",
      message: "Đã xóa!"
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

export const list = async (req: Request, res: Response) => {
  let limitItems = 12;
  if(req.query.limitItems) {
    limitItems = parseInt(`${req.query.limitItems}`);
  }

  // Phân trang
  let page = 1;
  if(req.query.page) {
    const currentPage = parseInt(`${req.query.page}`);
    if(currentPage > 0) {
      page = currentPage;
    }
  }
  const totalRecord = await AccountCompany.countDocuments({});
  const totalPage = Math.ceil(totalRecord/limitItems);
  // console.log(totalPage);
  // console.log(totalRecord);
  // console.log(limitItems);
  if(page > totalPage && totalPage != 0) {
    page = totalPage;
  }
  const skip = (page - 1) * limitItems;
  // Hết Phân trang

  const companyList = await AccountCompany
    .find({})
    .limit(limitItems)
    .sort({
      createdAt: "desc"
    })
    .limit(limitItems)
    .skip(skip);

  const companyListFinal = [];

  for (const item of companyList) {
    const dataItemFinal = {
      id: item.id,
      logo: item.logo,
      companyName: item.companyName,
      cityName: "",
      totalJob: 0
    };

    // Thành phố
    const city = await City.findOne({
      _id: item.city
    })
    dataItemFinal.cityName = `${city?.name}`;

    // Tổng số việc làm
    const totalJob = await Job.countDocuments({
      companyId: item.id
    })
    dataItemFinal.totalJob = totalJob;

    companyListFinal.push(dataItemFinal);
  }

  res.json({
    code: "success",
    message: "Thành công!",
    companyList: companyListFinal,
    totalPage: totalPage
  })
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const record = await AccountCompany.findOne({
      _id: id
    })

    if(!record) {
      res.json({
        code: "error",
        message: "Id không hợp lệ!"
      })
      return;
    }

    // Thông tin công ty
    const companyDetail = {
      id: record.id,
      logo: record.logo,
      companyName: record.companyName,
      address: record.address,
      companyModel: record.companyModel,
      companyEmployees: record.companyEmployees,
      workingTime: record.workingTime,
      workOvertime: record.workOvertime,
      description: record.description,
    };

    // Danh sách việc làm
    const jobList = await Job
      .find({
        companyId: record.id
      })
      .sort({
        createdAt: "desc"
      })

    const dataFinal = [];

    const city = await City.findOne({
    _id: record.city
  })

    for (const item of jobList) {
      dataFinal.push({
        id: item.id,
        companyLogo: record.logo,
        title: item.title,
        companyName: record.companyName,
        salaryMin: item.salaryMin,
        salaryMax: item.salaryMax,
        position: item.position,
        workingForm: item.workingForm,
        companyCity: city?.name,
        technologies: item.technologies,
      });
    }

    res.json({
      code: "success",
      message: "Thành công!",
      companyDetail: companyDetail,
      jobList: dataFinal
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

export const listCV = async (req: AccountRequest, res: Response) => {
  const companyId = req.account.id;

  const listJob = await Job.find({
    companyId: companyId
  });

  const listJobId = listJob.map(item => item.id);

  let totalPage = 0;
  let totalRecord = 0;

  // Phân trang
  const limitItems = 3;
  let page = 1;
  if(req.query.page) {
    const currentPage = parseInt(`${req.query.page}`);
    if(currentPage > 0) {
      page = currentPage;
    }
  }
  totalRecord = await CV.countDocuments();
  totalPage = Math.ceil(totalRecord/limitItems);
  if(page > totalPage && totalPage != 0) {
    page = totalPage;
  }
  const skip = (page - 1) * limitItems;
  // Hết Phân trang

  const listCV = await CV
    .find({
      jobId: { $in: listJobId }
    })
    .sort({
      createdAt: "desc"
    })
    .limit(limitItems)
    .skip(skip);

  const dataFinal = [];

  for (const item of listCV) {
    const dataItemFinal = {
      id: item.id,
      jobTitle: "",
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      jobSalaryMin: 0,
      jobSalaryMax: 0,
      jobPosition: "",
      jobWorkingForm: "",
      viewed: item.viewed,
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
    }

    dataFinal.push(dataItemFinal);
  }

  res.json({
    code: "success",
    message: "Lấy danh sách CV thành công!",
    listCV: dataFinal,
    totalPage: totalPage,
    totalRecord: totalRecord
  })
}

export const detailCV = async (req: AccountRequest, res: Response) => {
  try {
    const companyId = req.account.id;
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
      _id: infoCV.jobId,
      companyId: companyId
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

    // Cập nhật trạng thái thành đã xem
    await CV.updateOne({
      _id: cvId
    }, {
      viewed: true
    })

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

export const changeStatusCVPatch = async (req: AccountRequest, res: Response) => {
  try {
    const companyId = req.account.id;
    const status = req.body.action;
    const cvId = req.body.id;

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
      _id: infoCV.jobId,
      companyId: companyId
    })

    if(!infoJob) {
      res.json({
        code: "error",
        message: "Không có quyền truy cập!"
      });
      return;
    }

    await CV.updateOne({
      _id: cvId
    }, {
      status: status
    })

    res.json({
      code: "success",
      message: "Thành công!"
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

export const deleteCVDel = async (req: AccountRequest, res: Response) => {
  try {
    const companyId = req.account.id;
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
      _id: infoCV.jobId,
      companyId: companyId
    })

    if(!infoJob) {
      res.json({
        code: "error",
        message: "Không có quyền truy cập!"
      });
      return;
    }

    await CV.deleteOne({
      _id: cvId
    })

    res.json({
      code: "success",
      message: "Đã xóa!"
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}
