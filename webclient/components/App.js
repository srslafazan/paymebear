export default ({ children }) => {
  return (
    <main>
      {children}
      <style jsx global>{`
        * {
          font-family: "Comic Sans MS", cursive, sans-serif;
        }
      `}</style>
    </main>
  )
}
