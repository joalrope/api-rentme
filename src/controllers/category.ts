import { Request, Response } from "express";
import { Category, ICategory } from "../models";
import { generateSlug, HttpStatus } from "../helpers";

interface ICat extends ICategory {
  item?: number;
}

export const getCategories = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  let total!: number;
  let categories!: ICat[] | null;

  try {
    [total, categories] = await Promise.all([
      Category.count(),
      Category.findAll({
        offset: Number(from),
        limit: Number(limit),
      }),
    ]);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  /*categories.map((cat) => {
    //TODO: obtener los items por categoria de las propiedades
    cat.dataValues.items = 0;
    cat.dataValues.label = cat.dataValues.name;
    cat.dataValues.value = cat.dataValues.slug;
  });*/

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "The list of categories was successfully obtained!!",
    result: {
      total,
      categories,
    },
  });
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  let categoryDB: ICategory | null;

  try {
    categoryDB = await Category.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!categoryDB) {
    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: `The category with id: ${id} does not exist`,
      result: categoryDB,
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: `The category with id: ${id} was successfully obtained`,
    result: categoryDB,
  });
};

export const createCategory = async (req: Request, res: Response) => {
  let category: ICategory;
  const { name, ...restData } = req.body;

  const categoryDB = await Category.findOne({ where: { name } });

  if (categoryDB) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "There is already a category with the name ${name}",
      result: {},
    });
  }

  const slug = generateSlug(name);

  try {
    category = await Category.create({ name, slug, ...restData });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.CREATED).json({
    ok: true,
    msg: "Category created successfully",
    result: {
      category,
    },
  });
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  let category!: ICategory | null;

  try {
    category = await Category.findByPk(id);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  if (!category) {
    return res.status(HttpStatus.CONFLICT).json({
      ok: false,
      msg: `The category with id: ${id} does not exist`,
      result: {},
    });
  }

  await category?.update({ ...req.body });

  await category?.save();

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Category updated successfully",
    result: category,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Category.destroy({ where: { id } });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }

  return res.status(HttpStatus.OK).json({
    ok: true,
    msg: "Category deleted successfully",
    result: {},
  });
};
