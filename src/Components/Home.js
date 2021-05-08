import React from "react";

import Collections from "./Collections";

function Home({ firestore, auth }) {
  console.log("You want to go for a home component");

  return (
    <section>
      <Collections firestore={firestore} auth={auth} />
    </section>
  );
}

export default Home;
