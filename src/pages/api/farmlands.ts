import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import { FeatureCollection, Feature, Polygon } from 'geojson'; // Import Feature and Polygon types

interface Farmlands {
    uniq_id: string;
    first_name: string;
    last_name: string;
    central_ma: string;
    gender: string;
    geom: Polygon; // Assuming the geometry type is Polygon
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const result = await client.query<Farmlands>('SELECT uniq_id, first_name, last_name, gender, ST_AsGeoJSON(geom)::json AS geom FROM public.farm_boundary2');
    client.release();

    // Format data as GeoJSON FeatureCollection
    const features: Feature<Polygon, { uniq_id: string; first_name: string; last_name: string; gender: string; }>[] = result.rows.map(row => {
      const geometry = row.geom;
      const properties = {
        uniq_id: row.uniq_id,
        first_name: row.first_name,
        last_name: row.last_name,
        gender: row.gender,
        // Add more properties as needed
      };
      return {
        type: 'Feature',
        geometry: geometry,
        properties: properties
      };
    });

    const featureCollection: FeatureCollection<Polygon> = {
      type: 'FeatureCollection',
      features: features
    };

    res.status(200).json(featureCollection);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
