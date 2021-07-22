import { Link, useParams } from "react-router-dom";
import { useGetWorkspaceBySlugQuery } from "__generated__/graphql";

interface ParamTypes {
  workspaceSlug: string;
}

export function WorkspaceMenu() {
  const { workspaceSlug } = useParams<ParamTypes>();

  const { data, loading, error } = useGetWorkspaceBySlugQuery({
    variables: {
      workspaceSlug,
    },
  });

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (!data && loading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>no drawing..</div>;
  }

  const workspace = data.workspaces[0];

  if (!workspace) {
    return <div>no workspace</div>;
  }

  return (
    <div>
      <div className="">
        <Link to={`/${workspace.slug}`}>
          <div className="py-2 px-3 text-2xl bg-gray-200">{workspace.slug}</div>
        </Link>
      </div>
      <div className="font-bold mt-8 mb-4 ml-4">Collections</div>
      <div>
        {workspace.collections.map((collection) => {
          return (
            <Link
              key={collection.id}
              to={`/${workspace.slug}/${collection.id}`}
              className="border-b border-gray-200 block py-2 hover:bg-gray-100 px-4 transition-all duration-200 ease-in-out"
            >
              {collection.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
