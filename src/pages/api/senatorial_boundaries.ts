// src/pages/api/senatorial_boundaries.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db'; // Ensure the correct path

interface Boundary {
  sd_ref: string;
  adm1_en: string;
  geom: GeoJSON.Geometry;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const result = await client.query<Boundary>('SELECT sd_ref, adm1_en, geom FROM public.senatorial_boundary');
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
