import { Router } from "express";
import * as companyController from "../controllers/company.controller";
import * as companyValidate from "../validates/company.validate";
import multer from "multer";
import { storage } from "../helpers/cloudinary.helper";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = Router();

const upload = multer({ storage: storage });

router.post(
  '/register', 
  companyValidate.registerPost, 
  companyController.registerPost
);

router.post(
  '/login', 
  companyValidate.loginPost, 
  companyController.loginPost
);

router.patch(
  '/profile', 
  authMiddleware.verifyTokenCompany,
  upload.single("logo"),
  companyController.profilePatch
);

router.post(
  '/job/create', 
  authMiddleware.verifyTokenCompany,
  upload.array('images', 8),
  companyController.createJobPost
);

router.get(
  '/job/list', 
  authMiddleware.verifyTokenCompany,
  companyController.listJob
);

router.get(
  '/job/edit/:id', 
  authMiddleware.verifyTokenCompany,
  companyController.editJob
);

router.patch(
  '/job/edit/:id', 
  authMiddleware.verifyTokenCompany,
  upload.array('images', 8),
  companyController.editJobPatch
);

router.delete(
  '/job/delete/:id', 
  authMiddleware.verifyTokenCompany,
  companyController.deleteJobDel
);

router.get(
  '/list', 
  companyController.list
);

router.get(
  '/detail/:id', 
  companyController.detail
);

router.get(
  '/cv/list', 
  authMiddleware.verifyTokenCompany,
  companyController.listCV
);

router.get(
  '/cv/detail/:id', 
  authMiddleware.verifyTokenCompany,
  companyController.detailCV
);

router.patch(
  '/cv/change-status', 
  authMiddleware.verifyTokenCompany,
  companyController.changeStatusCVPatch
);

router.delete(
  '/cv/delete/:id', 
  authMiddleware.verifyTokenCompany,
  companyController.deleteCVDel
);

export default router;
