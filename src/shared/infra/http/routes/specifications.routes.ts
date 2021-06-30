import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthentication);
specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
