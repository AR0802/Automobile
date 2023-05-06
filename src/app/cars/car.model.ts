export class Car {
  public name: string;
  public description: string;
  public price: number;
  public imagePath: string;
  public details: { name: string; value: string }[];
  public phone: string;
  public email: string;
  public userId: string;
  public inCart: { userId: string }[];

  constructor(
    name: string,
    description: string,
    price: number,
    imagePath: string,
    details: { name: string; value: string }[],
    phone: string,
    email: string,
    userId: string,
    inCart: { userId: string }[]
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
    this.details = details;
    this.phone = phone;
    this.email = email;
    this.userId = userId;
    this.inCart = inCart;
  }
}
