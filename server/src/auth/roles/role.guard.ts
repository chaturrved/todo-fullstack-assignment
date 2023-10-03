import { Type, CanActivate, ExecutionContext, mixin } from "@nestjs/common";
import { RequestWithUser } from "src/users/requestWithUser.interface";
import { Role } from "./role.enum";

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
 
      return user?.role === role;
    }
  }
  return mixin(RoleGuardMixin);
}
