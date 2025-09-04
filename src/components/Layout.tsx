import { type JSX, type ReactNode, Children } from 'react';
import { clsx } from 'clsx';

type LayoutProps = {
  children: ReactNode;
  sectionClassName?: string;
};

export default function Layout({
  children,
  sectionClassName,
}: LayoutProps): JSX.Element {
  const sectionClass = clsx('section-padding', sectionClassName);
  return (
    <main>
      {Children.map(children, (child, index) => (
        <section className={sectionClass} key={index}>
          {child}
        </section>
      ))}
    </main>
  );
}
