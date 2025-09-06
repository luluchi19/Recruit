import { Request, Response } from "express";
import Job from "../models/job.model";
import AccountCompany from "../models/account-company.model";
import City from "../models/city.model";

export const search = async (req: Request, res: Response) => {
  const dataFinal = [];
  let totalPage = 0;
  let totalRecord = 0;

  if(Object.keys(req.query).length > 0) {
    const find: any = {};

    // Language
    if(req.query.language) {
      find.technologies = req.query.language;
    }

    // City
    if(req.query.city) {
      const city = await City.findOne({
        name: req.query.city
      })

      if(city) {
        const listAccountCompanyInCity = await AccountCompany.find({
          city: city.id
        })

        const listIdAccountCompany = listAccountCompanyInCity.map(item => item.id);

        find.companyId = { $in: listIdAccountCompany };
      }
    }

    // Company
    if(req.query.company) {
      const accountCompany = await AccountCompany.findOne({
        companyName: req.query.company
      })

      find.companyId = accountCompany?.id;
    }

    // Keyword
    if(req.query.keyword) {
      const keywordRegex = new RegExp(`${req.query.keyword}`, "i"); //ép kiểu về dạng chuỗi, tìm kiếm không phân biệt chữ hoa chữ thường
      find["$or"] = [
        { title: keywordRegex },
        { technologies: keywordRegex }
      ];
    }

    // Position
    if(req.query.position) {
      find.position = req.query.position;
    }

    // Working Form
    if(req.query.workingForm) {
      find.workingForm = req.query.workingForm;
    }

    // Phân trang
    const limitItems = 3;
    let page = 1;
    if(req.query.page) {
      const currentPage = parseInt(`${req.query.page}`);
      if(currentPage > 0) {
        page = currentPage;
      }
    }
    totalRecord = await Job.countDocuments(find);
    totalPage = Math.ceil(totalRecord/limitItems);
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

    for (const item of jobs) {
      const itemFinal = {
        id: item.id,
        companyLogo: "",
        title: item.title,
        companyName: "",
        salaryMin: item.salaryMin,
        salaryMax: item.salaryMax,
        position: item.position,
        workingForm: item.workingForm,
        companyCity: "",
        technologies: item.technologies,
      };

      const companyInfo = await AccountCompany.findOne({
        _id: item.companyId
      })

      if(companyInfo) {
        itemFinal.companyLogo = `${companyInfo.logo}`;
        itemFinal.companyName = `${companyInfo.companyName}`;
        
        const city = await City.findOne({
          _id: companyInfo.city
        })
        itemFinal.companyCity = `${city?.name}`;
      }

      dataFinal.push(itemFinal);
    }
  }

  res.json({
    code: "success",
    message: "Thành công!",
    jobs: dataFinal,
    totalPage: totalPage,
    totalRecord: totalRecord
  })
}
