import { FastifyReply, FastifyRequest } from "fastify";

const controller = {
  default: async (req: FastifyRequest, res: FastifyReply) => {
    res.status(200).send({
      message: "Hello World!",
    });
  },

  get: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      console.log("GET request...");
      const result = await req.server.client_amoCRM.request.get(
        "/api/v4/leads"
      );

      console.log("Successfully getting data 🏃‍♂️🏃‍♀️");
      return res.status(200).send({
        message: result.data,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getByQuery: async (
    req: FastifyRequest<{ Params: { name: string } }>,
    res: FastifyReply
  ) => {
    try {
      console.log("GET request with query:", req.params.name);
      const result = await req.server.client_amoCRM.request.get(
        "/api/v4/leads",
        {
          "filter[name]": req.params.name,
          "order[updated_at]": "desc",
          limit: 1,
        }
      );

      console.log("Successfully getting data 🏃‍♂️");
      return res.status(200).send({
        message: result.data,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  post: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      console.log("POST request...");
      const requestData: any = req.body;
      await req.server.client_amoCRM.request.post(
        "/api/v4/leads/complex",
        requestData
      );

      console.log("Successfully created 🚀");
      return res.status(200).send({
        message: "Successfully created 🚀",
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  patch: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      console.log("PATCH request...");
      const requestData: any = req.body;
      const result = await req.server.client_amoCRM.request.patch(
        "/api/v4/leads",
        requestData
      );
      console.log("Successfully edited leads 🚀");
      return res.status(200).send({
        message: "Successfully edited leads 🚀",
        data: result.data,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

export default controller;
