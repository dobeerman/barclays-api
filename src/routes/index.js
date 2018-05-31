import express from 'express';

import atms from './atms';
import initialize from './initialize';

const router = express.Router();

router.get('/atms', atms);
router.get('/init', initialize);

export default router;
