import { Request, Response } from 'express';

import Item from '../models/Item';

async function index(req: Request, res: Response) {
  try {
    const items = await Item.find();

    const serializedItems = items.map((item: any) => ({
      _id: item._id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }));

    return res.json(serializedItems);
  } catch (e) {
    return res.status(404).json(e);
  }
}

async function store(req: Request, res: Response) {
  try {
    const { list } = req.body;

    /**
     * Mapea todos os itens da lista.
     * Cada item é um novo elemento para ser salvo no banco.
     * O método Item.create retorna uma promise.
     * O método map retorna cada promise de cada Item.create em um array de
     * promises.
     * O array de promises vai direto para o método Promise.all que tratará
     * todas como uma só promise que resolverá quando todas forem resolvidas.
     *
     * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
     */
    const items = await Promise.all(list.map((item: any) => Item.create(item)));

    if (items) {
      return res.json(items);
    }

    throw new Error('Empty');
  } catch (e) {
    // console.error(e);
    return res.status(500).json(e);
  }
}

export default {
  index,
  store,
};
