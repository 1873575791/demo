import { createBrowserRouter } from "react-router-dom";
import Context from "@/components/Context"; // context学习
import ImageList from "@/components/ImageList"; // 图片列表
import App from "@/App";
import Text3D from "@/components/Text3D";
import Regular from "@/components/Regular";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        name: 'context学习',
        element: <Context />,
      },
      {
        path: "/imageList",
        name: '图片列表',
        element: <ImageList />,
      },
      {
        path: "/text3D",
        name: 'text3D',
        element: <Text3D />,
      },
      {
        path: '/regular', 
        name: '正则表达式', 
        element: <Regular />,
      }
    ]
  },
];

const router = createBrowserRouter(routes)

export default router;