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
      <div className="my-2 text-2xl">{workspace.name}</div>
      <div>
        {workspace.drawings.map((drawing) => {
          return (
            <Link
              key={drawing.id}
              to={`/${workspace.slug}/${drawing.id}`}
              className="border-b border-gray-200 block py-2 hover:bg-gray-100 px-4 transition-all duration-200 ease-in-out"
            >
              {drawing.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
