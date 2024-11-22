import express, { NextFunction, Request, Response } from "express";
const app = express();

app.use(express.json());
app.use(express.text());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    "\nurlName: ",
    req.url,
    "\nurlMethod: ",
    req.method,
    "\nhostname: ",
    req.hostname
  );

  next();
};

const userRouter = express.Router();
const courseRouter = express.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.get("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.send({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.send({
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Hello World!");
    } catch (error) {
      console.log(error);
      next(error);
      // res.status(500).send({
      //   success: false,
      //   message: "An error occurred",
      //   data: null,
      // });
    }
  }
);
app.get("/:userId/:subId", logger, (req: Request, res: Response) => {
  console.log(req.params);
  res.send("Hello Developer!");
});
app.post("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello Developer",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Invalid URL",
  });
});

//global error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default app;
