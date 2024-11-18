import bcryptjs from "bcryptjs";
import { generateSlug } from "../../helpers";
import {
  Availability,
  Category,
  Favorite,
  Image,
  Property,
  User,
} from "../../models";

export const seedDB = async () => {
  // run seed

  let user1 = await User.findOne({
    where: { email: "pelarez@hotmail.com" },
  });

  let user2 = await User.findOne({
    where: { email: "joalrope@gmail.com" },
  });

  let property1 = await Property.findOne({
    where: { title: "chalet veraniego tipo suizo" },
  });

  let property2 = await Property.findOne({
    where: { title: "chalet primaveral en la isla" },
  });

  if (!user1) {
    user1 = await User.create({
      fullname: "Pedro Larez",
      email: "pelarez@hotmail.com",
      password: bcryptjs.hashSync("123456", bcryptjs.genSaltSync()),
      phone: "+563583584679",
      picture:
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNy00MDMucG5n.png",
    });

    property1 = await Property.create({
      title: "Chalet veraniego tipo Suizo",
      slug: generateSlug("Chalet veraniego tipo Suizo"),
      description:
        "Bello chalet en las costas mediterranea, con acabados rusticos",
      address: "Calle La Orchila 4532",
      location: { type: "POINT", coordinates: [23.98545656, -8.67228809] },
      city: "High Towm",
      userId: user1.id,
      owner: "Pedro Larez",
      categoryId: "0a80a649-0677-427b-99d4-28c75d820544",
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
      rentalPrice: 1200,
      parkingLots: 3,
      areaInformation:
        "Av. La guardia a 100 m, C.C. La Estele a 200m, Biblioteca publica, Cine",
    });

    await Favorite.create({
      userId: user1.id,
      propertyId: property1.id,
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
  }

  if (!user2) {
    user2 = await User.create({
      fullname: "José Rodríguez",
      email: "joalrope@gmail.com",
      password: bcryptjs.hashSync("123456", bcryptjs.genSaltSync()),
      phone: "+584148698680",
      picture: "",
    });

    property2 = await Property.create({
      title: "Cabaña en isla de Maprado",
      slug: generateSlug("Cabaña en isla de Maprado"),
      description:
        "Comoda cabaña especial para retiros de vacaciones en la isla de Maprado",
      address: "Costa oeste Maprado 6591",
      location: { type: "POINT", coordinates: [23.98545656, -8.67228809] },
      city: "Maprado Island",
      userId: user2!.id,
      owner: "José Rodríguez",
      categoryId: "6b0166f2-4934-4c52-b8d9-69b4b0eb7f66",
      phone: "+552358613284",
      totalArea: 1800,
      coveredArea: 380,
      rooms: 12,
      toilets: 6,
      floors: 1,
      hasGrill: true,
      hasGarden: true,
      hasPool: false,
      antiquity: 35,
      rentalPrice: 1500,
      parkingLots: 30,
      areaInformation: "",
    });

    await Favorite.create({
      userId: user2.id,
      propertyId: property2.id,
    });

    await Image.create({
      propertyId: property2.id,
      pos: 1,
      url: "https://cloudinary.com/gh76fjhfg98640rde4gfdc58j",
    });

    await Image.create({
      propertyId: property2.id,
      pos: 2,
      url: "https://cloudinary.com/h76fjhkukgkgg7g986gkgg7gh",
    });

    await Availability.create({
      propertyId: property2.id,
      start: "2024-03-03",
      end: "2024-07-11",
    });

    await Availability.create({
      propertyId: property2.id,
      start: "2024-09-13",
      end: "2024-11-25",
    });

    await Category.create({
      name: "Apartamentos",
      slug: generateSlug("Apartamentos"),
      ellipsis: "Aptos",
      icon: "apartment",
      pictureUrl:
        "https://res.cloudinary.com/joalrope/image/upload/v1730925399/rentme/image-1730925398124.png",
    });

    await Category.create({
      name: "Barrio Privado",
      slug: generateSlug("Barrio Privado"),
      ellipsis: "Barrio P.",
      icon: "network-locked",
      pictureUrl:
        "https://res.cloudinary.com/joalrope/image/upload/v1730925136/rentme/image-1730925135231.png",
    });

    await Category.create({
      name: "Hoteles",
      slug: generateSlug("Hoteles"),
      ellipsis: "Hotel",
      icon: "hotel",
      pictureUrl:
        "https://res.cloudinary.com/joalrope/image/upload/v1730925136/rentme/image-1730925135231.png",
    });

    await Category.create({
      name: "Edificios",
      slug: generateSlug("Edificios"),
      ellipsis: "Edificio",
      icon: "location-city",
      pictureUrl:
        "https://res.cloudinary.com/joalrope/image/upload/v1730925487/rentme/image-1730925485580.png",
    });

    await Category.create({
      name: "Chacas",
      slug: generateSlug("Chacas"),
      ellipsis: "Chacas",
      icon: "cottage",
      pictureUrl:
        "https://res.cloudinary.com/joalrope/image/upload/v1730925243/rentme/image-1730925241807.png",
    });

    await Category.create({
      name: "Casas",
      slug: generateSlug("Casas"),
      ellipsis: "Casas",
      icon: "home",
      pictureUrl:
        "https://res.cloudinary.com/joalrope/image/upload/v1730924961/rentme/image-1730924959568.png",
    });
  }

  console.log("Database seeded successfully");
};
