import { Link } from "react-router-dom";
import { useGetWorksapcesQuery } from "__generated__/graphql";
import { WorkspaceNew } from "./workspaces/workspace-new";

export function Dashboard() {
  const { data, error, loading } = useGetWorksapcesQuery();

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>Workspaces</h1>

      {loading && <div>Loading...</div>}
      {data?.workspaces.map((workspace) => {
        return (
          <div key={workspace.id}>
            <Link to={`/${workspace.slug}`}>{workspace.name}</Link>
          </div>
        );
      })}

      <div className="py-12">
        <WorkspaceNew />
      </div>
    </div>
  );
}
