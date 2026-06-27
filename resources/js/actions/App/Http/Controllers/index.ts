import DashboardController from './DashboardController'
import VoucherRedeemController from './VoucherRedeemController'
import VoucherInquiryController from './VoucherInquiryController'
import VoucherController from './VoucherController'
import VoucherBatchController from './VoucherBatchController'
import VoucherPrintController from './VoucherPrintController'
import VoucherReportController from './VoucherReportController'
import VoucherClaimController from './VoucherClaimController'
import UserController from './UserController'
import ActivityLogController from './ActivityLogController'
import StoreController from './StoreController'
import DepartmentController from './DepartmentController'
import EmployeeController from './EmployeeController'
import Settings from './Settings'
import BusinessSettingController from './BusinessSettingController'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
VoucherRedeemController: Object.assign(VoucherRedeemController, VoucherRedeemController),
VoucherInquiryController: Object.assign(VoucherInquiryController, VoucherInquiryController),
VoucherController: Object.assign(VoucherController, VoucherController),
VoucherBatchController: Object.assign(VoucherBatchController, VoucherBatchController),
VoucherPrintController: Object.assign(VoucherPrintController, VoucherPrintController),
VoucherReportController: Object.assign(VoucherReportController, VoucherReportController),
VoucherClaimController: Object.assign(VoucherClaimController, VoucherClaimController),
UserController: Object.assign(UserController, UserController),
ActivityLogController: Object.assign(ActivityLogController, ActivityLogController),
StoreController: Object.assign(StoreController, StoreController),
DepartmentController: Object.assign(DepartmentController, DepartmentController),
EmployeeController: Object.assign(EmployeeController, EmployeeController),
Settings: Object.assign(Settings, Settings),
BusinessSettingController: Object.assign(BusinessSettingController, BusinessSettingController),
}

export default Controllers