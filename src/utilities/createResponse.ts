import type { Response } from "express";
import type { CreateResponse } from "@/types/utilities";

const createResponse = (res: Response) => ({
  send: <T = Record<string, unknown>>(payload: CreateResponse<T>) => {
    res.status(payload.status_code).json(payload);
  },
});

export default createResponse;
