export const BotIcon = () => {
	return (
		<svg
			height="16"
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width="16"
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.75 2.79933C9.19835 2.53997 9.5 2.05521 9.5 1.5C9.5 0.671573 8.82843 0 8 0C7.17157 0 6.5 0.671573 6.5 1.5C6.5 2.05521 6.80165 2.53997 7.25 2.79933V5H7C4.027 5 1.55904 7.16229 1.08296 10H0V13H1V14.5V16H2.5H13.5H15V14.5V13H16V10H14.917C14.441 7.16229 11.973 5 9 5H8.75V2.79933ZM7 6.5C4.51472 6.5 2.5 8.51472 2.5 11V14.5H13.5V11C13.5 8.51472 11.4853 6.5 9 6.5H7ZM7.25 11.25C7.25 12.2165 6.4665 13 5.5 13C4.5335 13 3.75 12.2165 3.75 11.25C3.75 10.2835 4.5335 9.5 5.5 9.5C6.4665 9.5 7.25 10.2835 7.25 11.25ZM10.5 13C11.4665 13 12.25 12.2165 12.25 11.25C12.25 10.2835 11.4665 9.5 10.5 9.5C9.5335 9.5 8.75 10.2835 8.75 11.25C8.75 12.2165 9.5335 13 10.5 13Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const UserIcon = () => {
	return (
		<svg
			data-testid="geist-icon"
			height="16"
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width="16"
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const AttachmentIcon = () => {
	return (
		<svg
			height="16"
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width="16"
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.5 6.5V13.5C14.5 14.8807 13.3807 16 12 16H4C2.61929 16 1.5 14.8807 1.5 13.5V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5ZM13 6.5V13.5C13 14.0523 12.5523 14.5 12 14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13ZM9.5 2.12132V5H12.3787L9.5 2.12132Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export function Spinner({ className }: { className?: string }) {
	return (
		<svg
			className="w-5 h-5"
			style={{ color: "currentcolor" }}
			viewBox="0 0 2400 2400"
			width={24}
			height={24}
		>
			<title>Loading spinner</title>
			<g
				strokeWidth={200}
				strokeLinecap="round"
				stroke="currentColor"
				fill="none"
			>
				<path d="M1200 600L1200 100" />
				<path opacity={0.5} d="M1200 2300L1200 1800" />
				<path opacity={0.917} d="M900 680.4L650 247.4" />
				<path opacity={0.417} d="M1750 2152.6L1500 1719.6" />
				<path opacity={0.833} d="M680.4 900L247.4 650" />
				<path opacity={0.333} d="M2152.6 1750L1719.6 1500" />
				<path opacity={0.75} d="M600 1200L100 1200" />
				<path opacity={0.25} d="M2300 1200L1800 1200" />
				<path opacity={0.667} d="M680.4 1500L247.4 1750" />
				<path opacity={0.167} d="M2152.6 650L1719.6 900" />
				<path opacity={0.583} d="M900 1719.6L650 2152.6" />
				<path opacity={0.083} d="M1750 247.4L1500 680.4" />
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
					values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
					dur="0.83333s"
					begin="0s"
					repeatCount="indefinite"
					calcMode="discrete"
				/>
			</g>
		</svg>
	);
}

export const BoxIcon = ({ size = 16 }: { size: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 0.154663L8.34601 0.334591L14.596 3.58459L15 3.79466V4.25V11.75V12.2053L14.596 12.4154L8.34601 15.6654L8 15.8453L7.65399 15.6654L1.40399 12.4154L1 12.2053V11.75V4.25V3.79466L1.40399 3.58459L7.65399 0.334591L8 0.154663ZM2.5 11.2947V5.44058L7.25 7.81559V13.7647L2.5 11.2947ZM8.75 13.7647L13.5 11.2947V5.44056L8.75 7.81556V13.7647ZM8 1.84534L12.5766 4.22519L7.99998 6.51352L3.42335 4.2252L8 1.84534Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const HomeIcon = ({ size = 16 }: { size: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.5 6.56062L8.00001 2.06062L3.50001 6.56062V13.5L6.00001 13.5V11C6.00001 9.89539 6.89544 8.99996 8.00001 8.99996C9.10458 8.99996 10 9.89539 10 11V13.5L12.5 13.5V6.56062ZM13.78 5.71933L8.70711 0.646409C8.31659 0.255886 7.68342 0.255883 7.2929 0.646409L2.21987 5.71944C2.21974 5.71957 2.21961 5.7197 2.21949 5.71982L0.469676 7.46963L-0.0606537 7.99996L1.00001 9.06062L1.53034 8.53029L2.00001 8.06062V14.25V15H2.75001L6.00001 15H7.50001H8.50001H10L13.25 15H14V14.25V8.06062L14.4697 8.53029L15 9.06062L16.0607 7.99996L15.5303 7.46963L13.7806 5.71993C13.7804 5.71973 13.7802 5.71953 13.78 5.71933ZM8.50001 11V13.5H7.50001V11C7.50001 10.7238 7.72386 10.5 8.00001 10.5C8.27615 10.5 8.50001 10.7238 8.50001 11Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const GPSIcon = ({ size = 16 }: { size: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				d="M1 6L15 1L10 15L7.65955 8.91482C7.55797 8.65073 7.34927 8.44203 7.08518 8.34045L1 6Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="bevel"
				fill="transparent"
			></path>
		</svg>
	);
};

export const InvoiceIcon = ({ size = 16 }: { size: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13 15.1L12 14.5L10.1524 15.8857C10.0621 15.9534 9.93791 15.9534 9.8476 15.8857L8 14.5L6.14377 15.8922C6.05761 15.9568 5.94008 15.9601 5.85047 15.9003L3.75 14.5L3 15L2.83257 15.1116L1.83633 15.7758L1.68656 15.8756C1.60682 15.9288 1.5 15.8716 1.5 15.7758V15.5958V14.3985V14.1972V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5V14.2507V14.411V15.5881V15.7881C14.5 15.8813 14.3982 15.9389 14.3183 15.891L14.1468 15.7881L13.1375 15.1825L13 15.1ZM12.3787 5L9.5 2.12132V5H12.3787ZM8 1.5V5V6.5H9.5H13V13.3507L12.7717 13.2138L11.9069 12.6948L11.1 13.3L10 14.125L8.9 13.3L8 12.625L7.1 13.3L5.94902 14.1632L4.58205 13.2519L3.75 12.6972L3 13.1972V1.5H8Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const RouteIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.53033 0.719661L7 0.189331L5.93934 1.24999L6.46967 1.78032L6.68934 1.99999H3.375C1.51104 1.99999 0 3.51103 0 5.37499C0 7.23895 1.51104 8.74999 3.375 8.74999H12.625C13.6605 8.74999 14.5 9.58946 14.5 10.625C14.5 11.6605 13.6605 12.5 12.625 12.5H4.88555C4.56698 11.4857 3.61941 10.75 2.5 10.75C1.11929 10.75 0 11.8693 0 13.25C0 14.6307 1.11929 15.75 2.5 15.75C3.61941 15.75 4.56698 15.0143 4.88555 14H12.625C14.489 14 16 12.489 16 10.625C16 8.76103 14.489 7.24999 12.625 7.24999H3.375C2.33947 7.24999 1.5 6.41052 1.5 5.37499C1.5 4.33946 2.33947 3.49999 3.375 3.49999H6.68934L6.46967 3.71966L5.93934 4.24999L7 5.31065L7.53033 4.78032L8.85355 3.4571C9.24408 3.06657 9.24408 2.43341 8.85355 2.04288L7.53033 0.719661ZM2.5 14.25C3.05228 14.25 3.5 13.8023 3.5 13.25C3.5 12.6977 3.05228 12.25 2.5 12.25C1.94772 12.25 1.5 12.6977 1.5 13.25C1.5 13.8023 1.94772 14.25 2.5 14.25ZM14.5 2.74999C14.5 3.30228 14.0523 3.74999 13.5 3.74999C12.9477 3.74999 12.5 3.30228 12.5 2.74999C12.5 2.19771 12.9477 1.74999 13.5 1.74999C14.0523 1.74999 14.5 2.19771 14.5 2.74999ZM16 2.74999C16 4.1307 14.8807 5.24999 13.5 5.24999C12.1193 5.24999 11 4.1307 11 2.74999C11 1.36928 12.1193 0.249991 13.5 0.249991C14.8807 0.249991 16 1.36928 16 2.74999Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const FileIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5ZM5.13 5.00062H4.505V6.25062H5.13H6H6.625V5.00062H6H5.13ZM4.505 8H5.13H11H11.625V9.25H11H5.13H4.505V8ZM5.13 11H4.505V12.25H5.13H11H11.625V11H11H5.13Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const LoaderIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<g clipPath="url(#clip0_2393_1490)">
				<path d="M8 0V4" stroke="currentColor" strokeWidth="1.5"></path>
				<path
					opacity="0.5"
					d="M8 16V12"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.9"
					d="M3.29773 1.52783L5.64887 4.7639"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.1"
					d="M12.7023 1.52783L10.3511 4.7639"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.4"
					d="M12.7023 14.472L10.3511 11.236"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.6"
					d="M3.29773 14.472L5.64887 11.236"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.2"
					d="M15.6085 5.52783L11.8043 6.7639"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.7"
					d="M0.391602 10.472L4.19583 9.23598"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.3"
					d="M15.6085 10.4722L11.8043 9.2361"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
				<path
					opacity="0.8"
					d="M0.391602 5.52783L4.19583 6.7639"
					stroke="currentColor"
					strokeWidth="1.5"
				></path>
			</g>
			<defs>
				<clipPath id="clip0_2393_1490">
					<rect width="16" height="16" fill="white"></rect>
				</clipPath>
			</defs>
		</svg>
	);
};

export const UploadIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			data-testid="geist-icon"
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.5 4.875C1.5 3.01104 3.01104 1.5 4.875 1.5C6.20018 1.5 7.34838 2.26364 7.901 3.37829C8.1902 3.96162 8.79547 4.5 9.60112 4.5H12.25C13.4926 4.5 14.5 5.50736 14.5 6.75C14.5 7.42688 14.202 8.03329 13.7276 8.44689L13.1622 8.93972L14.1479 10.0704L14.7133 9.57758C15.5006 8.89123 16 7.8785 16 6.75C16 4.67893 14.3211 3 12.25 3H9.60112C9.51183 3 9.35322 2.93049 9.2449 2.71201C8.44888 1.1064 6.79184 0 4.875 0C2.18261 0 0 2.18261 0 4.875V6.40385C0 7.69502 0.598275 8.84699 1.52982 9.59656L2.11415 10.0667L3.0545 8.89808L2.47018 8.42791C1.87727 7.95083 1.5 7.22166 1.5 6.40385V4.875ZM7.29289 7.39645C7.68342 7.00592 8.31658 7.00592 8.70711 7.39645L11.7803 10.4697L12.3107 11L11.25 12.0607L10.7197 11.5303L8.75 9.56066V15.25V16H7.25V15.25V9.56066L5.28033 11.5303L4.75 12.0607L3.68934 11L4.21967 10.4697L7.29289 7.39645Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const MenuIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const PencilEditIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.75 0.189331L12.2803 0.719661L15.2803 3.71966L15.8107 4.24999L15.2803 4.78032L5.15901 14.9016C4.45575 15.6049 3.50192 16 2.50736 16H0.75H0V15.25V13.4926C0 12.4981 0.395088 11.5442 1.09835 10.841L11.2197 0.719661L11.75 0.189331ZM11.75 2.31065L9.81066 4.24999L11.75 6.18933L13.6893 4.24999L11.75 2.31065ZM2.15901 11.9016L8.75 5.31065L10.6893 7.24999L4.09835 13.841C3.67639 14.2629 3.1041 14.5 2.50736 14.5H1.5V13.4926C1.5 12.8959 1.73705 12.3236 2.15901 11.9016ZM9 16H16V14.5H9V16Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const CheckedSquare = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 16H1C0.447715 16 0 15.5523 0 15V1C0 0.447715 0.447716 0 1 0L15 8.17435e-06C15.5523 8.47532e-06 16 0.447724 16 1.00001V15C16 15.5523 15.5523 16 15 16ZM11.7803 6.28033L12.3107 5.75L11.25 4.68934L10.7197 5.21967L6.5 9.43935L5.28033 8.21967L4.75001 7.68934L3.68934 8.74999L4.21967 9.28033L5.96967 11.0303C6.11032 11.171 6.30109 11.25 6.5 11.25C6.69891 11.25 6.88968 11.171 7.03033 11.0303L11.7803 6.28033Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const UncheckedSquare = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<rect
				x="1"
				y="1"
				width="14"
				height="14"
				stroke="currentColor"
				strokeWidth="1.5"
				fill="none"
			/>
		</svg>
	);
};

export const MoreIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 4C7.17157 4 6.5 3.32843 6.5 2.5C6.5 1.67157 7.17157 1 8 1C8.82843 1 9.5 1.67157 9.5 2.5C9.5 3.32843 8.82843 4 8 4ZM8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8 9.5ZM6.5 13.5C6.5 14.3284 7.17157 15 8 15C8.82843 15 9.5 14.3284 9.5 13.5C9.5 12.6716 8.82843 12 8 12C7.17157 12 6.5 12.6716 6.5 13.5Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const TrashIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const InfoIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6.25002 7H7.00002H7.75C8.30229 7 8.75 7.44772 8.75 8V11.5V12.25H7.25V11.5V8.5H7.00002H6.25002V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const ArrowUpIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const StopIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 3H13V13H3V3Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const PaperclipIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
			className="-rotate-45"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.8591 1.70735C10.3257 1.70735 9.81417 1.91925 9.437 2.29643L3.19455 8.53886C2.56246 9.17095 2.20735 10.0282 2.20735 10.9222C2.20735 11.8161 2.56246 12.6734 3.19455 13.3055C3.82665 13.9376 4.68395 14.2927 5.57786 14.2927C6.47178 14.2927 7.32908 13.9376 7.96117 13.3055L14.2036 7.06304L14.7038 6.56287L15.7041 7.56321L15.204 8.06337L8.96151 14.3058C8.06411 15.2032 6.84698 15.7074 5.57786 15.7074C4.30875 15.7074 3.09162 15.2032 2.19422 14.3058C1.29682 13.4084 0.792664 12.1913 0.792664 10.9222C0.792664 9.65305 1.29682 8.43592 2.19422 7.53852L8.43666 1.29609C9.07914 0.653606 9.95054 0.292664 10.8591 0.292664C11.7678 0.292664 12.6392 0.653606 13.2816 1.29609C13.9241 1.93857 14.2851 2.80997 14.2851 3.71857C14.2851 4.62718 13.9241 5.49858 13.2816 6.14106L13.2814 6.14133L7.0324 12.3835C7.03231 12.3836 7.03222 12.3837 7.03213 12.3838C6.64459 12.7712 6.11905 12.9888 5.57107 12.9888C5.02297 12.9888 4.49731 12.7711 4.10974 12.3835C3.72217 11.9959 3.50444 11.4703 3.50444 10.9222C3.50444 10.3741 3.72217 9.8484 4.10974 9.46084L4.11004 9.46054L9.877 3.70039L10.3775 3.20051L11.3772 4.20144L10.8767 4.70131L5.11008 10.4612C5.11005 10.4612 5.11003 10.4612 5.11 10.4613C4.98779 10.5835 4.91913 10.7493 4.91913 10.9222C4.91913 11.0951 4.98782 11.2609 5.11008 11.3832C5.23234 11.5054 5.39817 11.5741 5.57107 11.5741C5.74398 11.5741 5.9098 11.5054 6.03206 11.3832L6.03233 11.3829L12.2813 5.14072C12.2814 5.14063 12.2815 5.14054 12.2816 5.14045C12.6586 4.7633 12.8704 4.25185 12.8704 3.71857C12.8704 3.18516 12.6585 2.6736 12.2813 2.29643C11.9041 1.91925 11.3926 1.70735 10.8591 1.70735Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const MoreHorizontalIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 8C4 8.82843 3.32843 9.5 2.5 9.5C1.67157 9.5 1 8.82843 1 8C1 7.17157 1.67157 6.5 2.5 6.5C3.32843 6.5 4 7.17157 4 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM13.5 9.5C14.3284 9.5 15 8.82843 15 8C15 7.17157 14.3284 6.5 13.5 6.5C12.6716 6.5 12 7.17157 12 8C12 8.82843 12.6716 9.5 13.5 9.5Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const MessageIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.8914 10.4028L2.98327 10.6318C3.22909 11.2445 3.5 12.1045 3.5 13C3.5 13.3588 3.4564 13.7131 3.38773 14.0495C3.69637 13.9446 4.01409 13.8159 4.32918 13.6584C4.87888 13.3835 5.33961 13.0611 5.70994 12.7521L6.22471 12.3226L6.88809 12.4196C7.24851 12.4724 7.61994 12.5 8 12.5C11.7843 12.5 14.5 9.85569 14.5 7C14.5 4.14431 11.7843 1.5 8 1.5C4.21574 1.5 1.5 4.14431 1.5 7C1.5 8.18175 1.94229 9.29322 2.73103 10.2153L2.8914 10.4028ZM2.8135 15.7653C1.76096 16 1 16 1 16C1 16 1.43322 15.3097 1.72937 14.4367C1.88317 13.9834 2 13.4808 2 13C2 12.3826 1.80733 11.7292 1.59114 11.1903C0.591845 10.0221 0 8.57152 0 7C0 3.13401 3.58172 0 8 0C12.4183 0 16 3.13401 16 7C16 10.866 12.4183 14 8 14C7.54721 14 7.10321 13.9671 6.67094 13.9038C6.22579 14.2753 5.66881 14.6656 5 15C4.23366 15.3832 3.46733 15.6195 2.8135 15.7653Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const SlashIcon = ({ size = 16 }: { size?: number }) => (
	<svg
		height={size}
		strokeLinejoin="round"
		viewBox="0 0 16 16"
		width={size}
		style={{ color: "currentcolor" }}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
			fill="currentColor"
		></path>
	</svg>
);

export const ArrowUpRightIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.75001 2H5.00001V3.5H5.75001H11.4393L2.21968 12.7197L1.68935 13.25L2.75001 14.3107L3.28034 13.7803L12.4988 4.56182V10.25V11H13.9988V10.25V3C13.9988 2.44772 13.5511 2 12.9988 2H5.75001Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const ArrowDownRightIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.4994 11.4399V5.74999V4.99999H13.9994V5.74999V12.9994C13.9994 13.5517 13.5517 13.9994 12.9994 13.9994H5.74999H4.99999V12.4994H5.74999H11.4376L2.21908 3.28092L1.68875 2.75059L2.74941 1.68993L3.27974 2.22026L12.4994 11.4399Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const ArrowUpRightSmallIcon = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const CheckCircle = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			height={size}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={size}
			style={{ color: "currentcolor" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
				fill="currentColor"
			></path>
		</svg>
	);
};

export const Itinerary = ({ size = 16 }: { size?: number }) => {
	return (
		<svg
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			style={{ color: "currentcolor" }}
			height={size}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 2C4 1.44772 4.44772 1 5 1H12C12.5523 1 13 1.44772 13 2V13C13 13.5523 12.5523 14 12 14H5C4.44772 14 4 13.5523 4 13V2ZM5.5 4.5C5.5 4.22386 5.72386 4 6 4H10C10.2761 4 10.5 4.22386 10.5 4.5C10.5 4.77614 10.2761 5 10 5H6C5.72386 5 5.5 4.77614 5.5 4.5ZM6 7C5.72386 7 5.5 7.22386 5.5 7.5C5.5 7.77614 5.72386 8 6 8H10C10.2761 8 10.5 7.77614 10.5 7.5C10.5 7.22386 10.2761 7 10 7H6ZM5.5 10.5C5.5 10.2239 5.72386 10 6 10H10C10.2761 10 10.5 10.2239 10.5 10.5C10.5 10.7761 10.2761 11 10 11H6C5.72386 11 5.5 10.7761 5.5 10.5Z"
				fill="currentColor"
			/>
			<path
				d="M11.5 9.5L13.5 8.5L13.5 10.5L11.5 12.5L10 11.5L11.5 9.5Z"
				fill="currentColor"
			/>
		</svg>
	);
};
