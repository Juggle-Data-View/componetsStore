import { toPath } from 'lodash';

/**
 * 根据 path 处理 name 的路径
 * @param name 配置项中的name字段，用 "." 分隔开
 * @param path 路径
 * Example:
 *  resolveName('a.b.c', './d/e');      // "a.b.c.d.e"
 *  resolveName('a.b.c', '/d/e');       // "a.b.c.d.e"
 *  resolveName('a.b.c', 'd/e');        // "a.b.c.d.e"
 *  resolveName('a.b.c', '#/d/e');      // "d.e"
 *  resolveName('a.b.c', '../d/e');     // "a.b.d.e"
 *  resolveName('a.b.c', '../../d/e');  // "a.d.e"
 *  resolveName('a.b.c', '../../');     // "a"
 */
 export const resolveName = (name: string, path: string): string => {
  const arrPath = path.split('/');
  const newPath = toPath(name); // name是一串用 "." 分隔的路径
  if (arrPath.length) {
    arrPath.forEach((str) => {
      // 处理 "/a/b" 、 "a//b/c" 、 "./a/b" 的情况
      if (!str || str === '.') return;

      // 如果匹配的`path`中包含`[]`结尾的字符串，替换为空
      // 这种匹配方式是为了初始化数据时设置默认值
      str = str.replace(/\[\]$/g, '');

      switch (str) {
        case '#': // 绝对路径
          newPath.length = 0;
          break;
        case '..': // 向上回退
          newPath.length = Math.max(newPath.length - 1, 0);
          break;
        default:
          newPath.push(str);
          break;
      }
    });
  }
  return newPath.join('.');
};

export const Angle2Matrix = (angle: number): { x: number; y: number; x2: number; y2: number } => {
  const radin = ((360 - angle) * Math.PI) / 180; //顺时针方向
  const xComponent = Math.sin(radin);
  const yComponent = Math.cos(radin);
  const xSComponent = -xComponent;
  const ySComponent = -yComponent;
  const cellMatrix = [
    [0.5 * (1 + xComponent), 0.5 * (1 + yComponent)],
    [0.5 * (1 + xSComponent), 0.5 * (1 + ySComponent)],
  ]; // 单位矩阵 * 0.5
  return {
    x: cellMatrix[0][0],
    y: cellMatrix[0][1],
    x2: cellMatrix[1][0],
    y2: cellMatrix[1][1],
  };
};