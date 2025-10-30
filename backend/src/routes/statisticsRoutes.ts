import { Router } from 'express';
import {
  getUserStatistics,
  getGamePopularity,
  getGlobalLeaderboard,
  getGameChartData
} from '../controllers/statisticsController';

const router = Router();

router.get('/user/:userId', getUserStatistics);
router.get('/games', getGamePopularity);
router.get('/global', getGlobalLeaderboard);
router.get('/charts/:gameId', getGameChartData);

export default router;