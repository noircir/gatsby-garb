import React from 'react';
import Layout from '../components/layout';
import { graphql, Link, StaticQuery } from 'gatsby';

const getImageData = graphql`
	{
		allFile {
			edges {
				node {
					relativePath
					size
					extension
					birthTime
				}
			}
		}
	}
`;

export default () => (
	<Layout>
		<h1>Hello from Page 3!</h1>
		<h3>Image File Data</h3>

		<StaticQuery
			query={getImageData}
			render={(data) => (
				<table>
					<thead>
						<tr>
							<th>Relative Path</th>
							<th>Size of Image</th>
							<th>Extension</th>
							<th>Created At</th>
						</tr>
					</thead>
					<tbody>
						{data.allFile.edges.map(({ node }, index) => (
							<tr key={index}>
								<td>{node.relativePath}</td>
								<td>{node.size}</td>
								<td>{node.extension}</td>
								<td>{node.birthTime}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		/>

		<Link to="/">Go back to the homepage</Link>
		<Link to="/page-2">Go to page 2</Link>
	</Layout>
);
