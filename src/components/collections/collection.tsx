import { DrawingNew } from "components/drawings/drawing-new";
import { Main } from "components/layout/main";
import { Link, useParams } from "react-router-dom";
import { useGetCollectionByIdQuery } from "__generated__/graphql";

interface ParamTypes {
  workspaceSlug: string;
  collectionId: string;
}
export function Collection() {
  const { collectionId } = useParams<ParamTypes>();

  const { data, error, loading } = useGetCollectionByIdQuery({
    variables: {
      collectionId,
    },
  });

  if (error) {
    console.log(error);
    return <Main>error</Main>;
  }

  if (loading) {
    return <Main>loading</Main>;
  }

  if (!data || !data.collection) {
    return <Main>no collection</Main>;
  }

  const { collection } = data;

  return (
    <Main>
      <div>
        <div>{collection.name}</div>
        <div className="grid grid-cols-6 space-x-3 my-8">
          {collection.drawings.map((drawing) => {
            return (
              <div key={drawing.id}>
                <Link
                  to={`/${drawing.collection.workspace.slug}/${drawing.collection.id}/${drawing.id}`}
                >
                  <div className="px-6 py-4 border rounded">{drawing.name}</div>
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <DrawingNew collectionId={collectionId} />
        </div>
      </div>
    </Main>
  );
}
