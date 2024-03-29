export enum PermissionEnums {
  CreateOrder = 'create:order',
  UpdateOrder = 'update:order',
  ReadOrder = 'read:order',
  DeleteOrder = 'delete:order',
  CreateProduct = 'create:product',
  UpdateProduct = 'update:product',
  ReadProduct = 'read:product',
  DeleteProduct = 'delete:product',
  CreateUser = 'create:user',
  UpdateUser = 'update:user',
  ReadUser = 'read:user',
  DeleteUser = 'delete:user',
  CreateRole = 'create:role',
  UpdateRole = 'update:role',
  DeleteRole = 'delete:role',
  ReadRole = 'read:role',
  // Superadmin only permissions
  CreateOrganization = 'create:organization',
  UpdateOrganization = 'update:organization',
  ReadOrganization = 'read:organization',
  DeleteOrganization = 'delete:organization',
  CreatePermission = 'create:permission',
  ReadPermission = 'read:permission',
  DeletePermission = 'delete:permission',
  UpdatePermission = 'update:permission',
}
