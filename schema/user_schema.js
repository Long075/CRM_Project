import Ajv from "ajv";
import addFormats from 'ajv-formats';
import { defineConfig } from "playwright/test";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const creSchema = {
  type: "object",
  required: ["status", "code"],
  additionalProperties: true,

  properties: {
    status: {type: "string", enum: ['success', 'error']},
    code: {type: "string" },
    message: {type: 'string'},
    data: {type: 'object'}
  },
  oneOf: [
    {required: ['data']},
    {required: ['message']}
  ]
}

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
      additionalProperties: false,
      properties: {
        user: {$ref: "#/definitions/user"},
        users: {
          type: 'array',
          items: {$ref: "#/definitions/user"}
        }
      },
      oneOf: [
        {required: ['user']},
        {required: ['users']}
      ]
    }
  },
  oneOf: [
    {required: ['data']},
    {required: ['message']}
  ],

  definitions: {
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

        mobile: {type: ["string", "null"] },
        email: {type: ["string", "null"], format: "email" },

        order: {type: ["string", "null"] },
        note: {type: ["string", "null"] },

        status: {type: "string", enum: ['HOAT_DONG', 'KHONG_HOAT_DONG']},
        created_date: {type: "string"},
      }
    }
  }
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

export const delSchema = {
  type: "object",
  required: ["status", "code"],
  additionalProperties: true,

  properties: {
    status: {type: "string", enum: ['success', 'error']},
    code: {type: "string" },
    message: {type: 'string'},
    data: {type: 'object'}
  },
  oneOf: [
    {required: ['data']},
    {required: ['message']}
  ]
}