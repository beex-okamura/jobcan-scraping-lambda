export interface PunchResponse {
  result: number;
  state: number;
  errors?: {
    aditCount: string;
  };
}
