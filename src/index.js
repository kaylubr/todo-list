import "./style.css";
import ScreenController from "./controllers/ScreenController";
import { deleteTodo } from "./controllers/TodoController";

window.ScreenController = ScreenController;
window.deleteTodo = deleteTodo;

ScreenController();