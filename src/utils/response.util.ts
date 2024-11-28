import { IResponse } from '@/dtos/interfaces/response.interface';
import StatusConst from '@/consts/status-code.const';
import MessageConst from '@/consts/message.const';

export default {
  ok: (result: any): IResponse<any> => {
    return {
      message: MessageConst.SUCCESS,
      httpCode: 200,
      statusCode: StatusConst.OK,
      result,
    };
  },
  notFound: (): IResponse<any> => {
    return {
      message: MessageConst.FAILED,
      httpCode: 404,
      statusCode: StatusConst.NOT_FOUND,
      result: null,
    };
  },
  serverErr: (result: any): IResponse<any> => {
    return {
      message: MessageConst.ERR,
      httpCode: 500,
      statusCode: StatusConst.ERR,
      result,
    };
  },
};
