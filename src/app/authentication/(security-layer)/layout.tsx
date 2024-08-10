import "./layout.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid security-layer__container">
      <div className="security-layer__content">{children}</div>
    </section>
  );
}
