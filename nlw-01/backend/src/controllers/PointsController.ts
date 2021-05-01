import { Request, Response } from 'express';

import Point from '../models/Point';
import PointItem from '../models/PointItem';

async function index(req: Request, res: Response) {
  try {
    const { city, uf } = req.query;

    const points = await Point.find().or([{ city }, { uf }]);

    console.log(points);

    if (points) {
      return res.json(points);
    }

    throw new Error();
  } catch (e) {
    return res.status(404).json(e);
  }
}

async function show(req: Request, res: Response) {
  try {
    const { _id } = req.params;

    const point = await Point.findById(_id);
    const items = await PointItem.find({ _point_id: _id });

    if (point && items) {
      const serializedItems = await Promise.all(
        items.map(async item => item.populate('_item_id').execPopulate())
      );

      return res.json({ point, items: serializedItems });
    }

    throw new Error();
  } catch (e) {
    return res.status(404).json(e);
  }
}

async function store(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const point = await Point.create({
      name,
      image:
        'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    if (point) {
      const pointId = point._id;

      await Promise.all(
        items.map((item: any) =>
          PointItem.create({
            _point_id: pointId,
            _item_id: item,
          })
        )
      );

      return res.json(point);
    }

    throw new Error();
  } catch (e) {
    return res.status(500).json(e);
  }
}

export default {
  index,
  show,
  store,
};
