import { IngestPerformance } from './ingest-performance.interface';
import { PreprocessingPerformance } from './preprocessing-performance.interface';

export type FramePerformance = {
  ingestPerformance: IngestPerformance;
  preprocessingPerformance: PreprocessingPerformance;
};
