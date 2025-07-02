import { Response } from 'express';

export function rpcSuccess(res: Response, result: any, id: number) {
  res.json({
    jsonrpc: '2.0',
    result,
    id
  });
}

export function rpcError(res: Response, code: number, e: unknown, id: number) {
  let message = 'Internal server error';
  
  if (code === 400) message = 'Bad request';
  else if (code === 401) message = 'Unauthorized';
  else if (code === 404) message = 'Not found';
  else if (code === 500) message = 'Internal server error';
  
  res.status(code).json({
    jsonrpc: '2.0',
    error: {
      code,
      message,
      data: e
    },
    id
  });
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
