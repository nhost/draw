import { Link } from "react-router-dom";
import { useGetWorksapcesQuery } from "__generated__/graphql";
import { Main } from "./layout/main";
import { WorkspaceNew } from "./workspaces/workspace-new";

export function Dashboard() {
  const { data, error, loading } = useGetWorksapcesQuery();

  if (error) {
    console.log(error);
    return <Main>error</Main>;
  }

  if (loading) {
    return <Main>loading</Main>;
  }

  return (
    <Main>
      <div className="my-8">
        <div className="font-bold">Workspaces</div>

        {loading && <div>Loading...</div>}
        {data?.workspaces.map((workspace) => {
          return (
            <div key={workspace.id} className="px-4 py-2 border-b">
              <Link to={`/${workspace.slug}`}>{workspace.name}</Link>
            </div>
          );
        })}

        <div className="py-12">
          <WorkspaceNew />
        </div>
      </div>
    </Main>
  );
}
