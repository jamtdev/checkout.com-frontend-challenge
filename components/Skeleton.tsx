import { Skeleton as AntdSkeleton } from 'antd';

/**
 * Renders a simple page loading skeleton.
 */
const Skeleton = () => (
  <>
    {Array(3)
      // Filling with `undefined` is fine, we don't need a value.
      // @ts-ignore
      .fill()
      .map((val, i) => (
        <AntdSkeleton key={i} active paragraph={{ rows: 4 }} />
      ))}
  </>
);

export default Skeleton;
