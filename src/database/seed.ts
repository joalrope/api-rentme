import bcryptjs from "bcryptjs";
import { generateSlugify } from "../helpers";
import {
  Availability,
  Image,
  Property,
  Reservation,
  Service,
  User,
} from "../models";

export const seedDB = async () => {
  // run seed

  await Availability.truncate();
  await Image.truncate();
  await Property.truncate({ cascade: true });
  await Reservation.truncate();
  await Service.truncate();
  await User.truncate();

  await User.create({
    fullname: "Pedro Larez",
    email: "pelarez@hotmail.com",
    password: bcryptjs.hashSync("123456", bcryptjs.genSaltSync()),
    phone: "+563583584679",
    image:
      "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNy00MDMucG5n.png",
  });

  await User.create({
    fullname: "José Rodríguez",
    email: "joalrope@gmail.com",
    password: bcryptjs.hashSync("123456", bcryptjs.genSaltSync()),
    phone: "+584148698680",
    image: "",
  });

  const property1 = await Property.create({
    title: "Chalet veraniego tipo Suizo",
    slug: generateSlugify("Chalet veraniego tipo Suizo"),
    description:
      "Bello chalet en las costas mediterranea, con acabados rusticos",
    address: "Calle La Orchila 4532",
    location: { type: "POINT", coordinates: [23.98545656, -8.67228809] },
    city: "High Towm",
    owner: "Pedro Navaja",
    phone: "+586461235",
    totalArea: 580,
    coveredArea: 128,
    rooms: 6,
    toilets: 4,
    floors: 2,
    hasGrill: false,
    hasGarden: true,
    hasPool: true,
    antiquity: 15,
    //images,
    rentalPrice: 1200,
    parkingLots: 3,
    areaInformation:
      "Av. La guardia a 100 m, C.C. La Estele a 200m, Biblioteca publica, Cine",
  });

  await Image.create({
    propertyId: property1.id,
    pos: 1,
    url: "https://cloudinary.com/gh76fjhfg98640rde4gfdc58j",
  });

  await Image.create({
    propertyId: property1.id,
    pos: 2,
    url: "https://cloudinary.com/h76fjhkukgkgg7g986gkgg7gh",
  });

  await Availability.create({
    propertyId: property1.id,
    start: "2024-03-03",
    end: "2024-07-11",
  });

  await Availability.create({
    propertyId: property1.id,
    start: "2024-09-13",
    end: "2024-11-25",
  });

  console.log("Database seeded successfully");
};
