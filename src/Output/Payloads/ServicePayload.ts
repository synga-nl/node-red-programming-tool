import { ServicePayloadData } from './Data/ServicePayloadData';

export class ServicePayload {
  domain: string | null = null;
  service: string | null = null;
  data: ServicePayloadData = new ServicePayloadData();
}
