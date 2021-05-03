import React from "react";

import Collections from "./Collections";

function Home({ firestore, auth }) {
  return (
    <section>
      <Collections firestore={firestore} auth={auth} />
    </section>
  );
}

export default Home;
