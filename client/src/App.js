import { useState } from "react";
import { AddAuthorDialog, AddBookDialog, Card, Main, Tabs } from "./components";
import { useQuery } from "@apollo/client";
import { GetAuthorsQuery } from "./graphql/GetAuthorsQuery";
import { AddAuthorMutation } from "./graphql/AddAuthorMutation";
import { useMutation } from "@apollo/client";

// Replace with real data
import { mockedAuthors, mockedBooks } from "./temporaryDatabase";
import Box from "@mui/material/Box";

import "@reach/tabs/styles.css";

function App() {
  const tabs = ["authors", "books"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [activeItem, setActiveItem] = useState(null);
  const [modalOpen, toggleModal] = useState(false);

  /**
   * Code goes here
   */
  const [addAuthor, { data: addAuthorData }] = useMutation(AddAuthorMutation);

  const handleAddAuthor = (authorName) => {
    addAuthor({
      variables: {
        name: authorName,
        books: [],
      },
    });
  };

  const { data, error, loading } = useQuery(GetAuthorsQuery);

  console.log(data, error, loading);

  return (
    <>
      <Main>
        <Box>
          <Tabs
            books={mockedBooks}
            authors={mockedAuthors}
            handleRemoveBook={() => console.log("Remove book!")} //Replace with a function
            handleRemoveAuthor={() => console.log("Remove author!")} //Replace with a function
            onRowClick={setActiveItem}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            toggleModal={() => toggleModal(true)}
            tabs={tabs}
          />
        </Box>
        {activeItem && <Card {...activeItem} />}
      </Main>

      {currentTab === "books" ? (
        <AddBookDialog
          onSubmit={() => console.log("Add book!")} //Replace with a function
          authors={mockedAuthors} // Replace with real data
          toggleModal={toggleModal}
          modalOpen={modalOpen}
        />
      ) : null}
      {currentTab === "authors" ? (
        <AddAuthorDialog
          onSubmit={() => handleAddAuthor()} //Replace with a function
          toggleModal={toggleModal}
          modalOpen={modalOpen}
          handleAddAuthor={handleAddAuthor}
        />
      ) : null}
    </>
  );
}

export default App;
