import { Router } from 'express';
import { globalSearch } from '../controllers/searchController';

const router = Router();

router.get('/', globalSearch);

export default router;