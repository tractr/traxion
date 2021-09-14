import { IngestPerformance } from './ingest-performance.interface';
import { PreprocessingPerformance } from './preprocessing-performance.interface';

export type FramePerformance = {
  numframe: number;
  idcamera: number;
  ingestPerformance: IngestPerformance;
  preprocessingPerformance: PreprocessingPerformance;
};
