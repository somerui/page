<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet	version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" />

<xsl:template match="/">
<html>
	<head>
	<meta charset="utf-8" />
	<title>
			<xsl:value-of select="rss/channel/title"/>
	</title>

	<style>
	@font-face {
		font-family: Unifont;
		src: url(/unifont-17.0.01.otf);
	}
	body {
		font-family: unifont;
		background: #f4f4f4;
		margin: 0;
		padding: 2rem;
		line-height: 1.6;
	}

	header {
		margin-bottom: 2rem;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

	.meta {
		color: #666;
		font-size: 0.9rem;
	}

	.post {
		background: white;
		border-radius: 10px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 4px 10px rgba(0,0,0,.05);
	}

	.post h2 {
		margin-top: 0;
	}

	.post a {
		color: #b5daffff;
		text-decoration: none;
	}

	.post a:hover {
		text-decoration: underline;
	}

	footer {
		margin-top: 3rem;
		font-size: 0.85rem;
		color: #777;
	}

	@media (prefers-color-scheme: dark) {
		body {
			background: #121212;
			color: #e0e0e0;
		}

		.post {
			background: #1e1e1e;
		}

		a {
			color: #7ab4ff;
		}
	}
	</style>
</head>
<body>

	<header>
		<h1><xsl:value-of select="rss/channel/title"/></h1>
		<div class="meta">
			<xsl:value-of select="rss/channel/copyright"/>
		</div>
	</header>
	<xsl:for-each select="rss/channel/item">
		<div class="post">
			<h2>
				<a>
					<xsl:attribute name="href">
						<xsl:value-of select="link"/>
					</xsl:attribute>
					<xsl:value-of select="title"/>
				</a>
			</h2>
			<div class="meta">
			Released at:<xsl:value-of select="pubDate"/>
			<br/>
			Author:<xsl:value-of select="author"/>
			</div>
			<div class="content">
				<xsl:value-of select="description" disable-output-escaping="yes"/>
			</div>
		</div>
	</xsl:for-each>
	<footer>
	<p>(c) 2026 somerui. All Right Reserved.</p>
	</footer>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
