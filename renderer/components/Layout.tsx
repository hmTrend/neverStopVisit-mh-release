import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";

import {Option} from "./option/Option";
import {Start} from "./start/Start";
import {Main} from "./main/Main";

export default function Layout({ children }) {
	return (
		<div>
			<header>
				<Tabs variant='enclosed'>
					<TabList>
						<Tab>메인</Tab>
						<Tab>옵션</Tab>
						<Tab>시작</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
						<Main />
						</TabPanel>
						<TabPanel>
							 <Option />
						</TabPanel>
						<TabPanel>
							<Start />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</header>
			<main>{children}</main>
			<footer>
				footer
			</footer>
		</div>
	)
}