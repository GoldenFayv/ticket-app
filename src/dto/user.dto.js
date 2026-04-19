class UserDto {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.email_verified = user.email_verified_at !== null;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.access_token = user.token;
  }
}

export default UserDto;
