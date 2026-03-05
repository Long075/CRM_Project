import Ajv from "ajv";
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const getSchema = {
  type: "object",
  required: ["status", "code"],
  additionalProperties: true,

  properties: {
    status: {type: "string", enum: ['success', 'error']},
    code: {type: "string" },
    message: {type: 'string'},
    data: {
      type: "object",
      required: ["user"],
      additionalProperties: false,
      properties: {
        user: {
          type: "object",
          required: ["id", "username", "email", "status"],
          additionalProperties: true, // cho phép xuất hiện thêm các field ngoài schema đã có
          properties: {
            id: {type: "string", format: 'uuid' },
            username: {type: "string" },
            name: {type: "string" },

            position: {type: ["string", "null"] },
            department_name: {type: ["string", "null"] },

            mobile: {type: "string" },
            email: {type: "string", format: "email" },

            order: {type: ["string", "null"] },
            note: {type: ["string", "null"] },

            status: {type: "string", enum: ['HOAT_DONG', 'KHONG_HOAT_DONG']},
            created_date: {type: "string"},
          }
        }
      }
    }
  },
  oneOf: [
    {required: ['data']},
    {required: ['message']}
  ]
};

export const updateSchema = {
  type: "object",
  required: ["status", "code"],
  additionalProperties: true,
  properties: {
    status: {type: "string", enum: ['success', 'error']},
    code: {type: "string" },
    message: {type: 'string'},
    data: {
      type: 'object',
      additionalProperties: false
    }
  },
  oneOf: [
    {required: ['data']},
    {required: ['message']}
  ]
};