import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthentication, createRentalController.handle);
rentalsRoutes.post('/devolution/:id', ensureAuthentication, devolutionRentalController.handle);

export { rentalsRoutes };
