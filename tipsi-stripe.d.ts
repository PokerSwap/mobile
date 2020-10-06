/*
 * File: /src/types/tipsi-stripe/tipsi-stripe.d.ts
 * Project: tr_client
 * Created Date: 2019-07-18
 *
 * Initial Implementation: https://github.com/tipsi/tipsi-stripe/pull/384/files
 * Also relevant: https://github.com/tipsi/tipsi-stripe/pull/264
 */
declare module "tipsi-stripe" {
	import { Component } from "react";
	import { StyleProp, ViewProps, ViewStyle } from "react-native";
	import PropTypes from "prop-types";

	export interface StripeOptions {
		publishableKey: string;
		merchantId?: string;
		androidPayMode?: string;
	}

	export type AccountHolderType = "company" | "individual";

	export type ApplePayNetworks =
		| "american_express"
		| "discover"
		| "master_card"
		| "visa";

	export type ApplePayAddressFields =
		| "all"
		| "name"
		| "email"
		| "phone"
		| "postal_address";

	export type ApplePayShippingType =
		| "shipping"
		| "delivery"
		| "store_pickup"
		| "service_pickup";

	export type StripeSourceType =
		| "bancontact"
		| "bitcoin"
		| "giropay"
		| "ideal"
		| "sepaDebit"
		| "sofort"
		| "threeDSecure"
		| "alipay";
	/**
	 * API: https://stripe.com/docs/api/payment_methods/object#payment_method_object-card-brand
	 * iOS: https://github.com/stripe/stripe-ios/blob/d4d32db2542e9ef65e423f7fbd8cd00e98936990/Stripe/STPPaymentMethodCard.m#L82-L102
	 * Android: https://github.com/stripe/stripe-android/blob/2a247df77bc088e1755a97cab407168cb428fa21/stripe/src/main/java/com/stripe/android/model/PaymentMethod.java#L512-L521
	 */
	export type CardBrandSlug =
		| "unknown"
		| "amex"
		| "diners"
		| "discover"
		| "jcb"
		| "mastercard"
		| "unionpay"
		| "visa";
	/**
	 * API: https://stripe.com/docs/api/cards/object#card_object-brand
	 * iOS: https://github.com/stripe/stripe-ios/blob/d4d32db2542e9ef65e423f7fbd8cd00e98936990/Stripe/STPCard.m#L43-L63
	 * Android: https://github.com/stripe/stripe-android/blob/2a247df77bc088e1755a97cab407168cb428fa21/stripe/src/main/java/com/stripe/android/model/Card.java#L49-L58
	 */
	export type CardBrandPresentableString =
		| "Unknown"
		| "American Express"
		| "Diners Club"
		| "Discover"
		| "JCB"
		| "MasterCard"
		| "UnionPay"
		| "Visa";
	/**
	 * https://stripe.com/docs/api/payment_intents/object#payment_intent_object-status
	 */
	export type StripePaymentIntentStatus =
		| "unknown"
		| "canceled"
		| "processing"
		| "requires_action"
		| "requires_capture"
		| "requires_payment_method"
		| "requires_confirmation"
		| "succeeded";

	export type PaymentMethodCardFunding =
		| "debit"
		| "credit"
		| "prepaid"
		| "unknown";
	/**
	 * https://stripe.com/docs/api/setup_intents/object#setup_intent_object-status
	 */
	export type StripeSetupIntentStatus =
		| "unknown"
		| "canceled"
		| "processing"
		| "requires_action"
		| "requires_payment_method"
		| "requires_confirmation"
		| "succeeded";

	export interface PaymentMethodCard {
		brand: CardBrandSlug;
		country: string;
		expMonth: number;
		expYear: number;
		funding?: PaymentMethodCardFunding;
		last4: string;
	}

	export interface PaymentMethod {
		id: string;
		created: number;
		livemode: boolean;
		type: string;
		card: PaymentMethodCard;
		billingDetails: PaymentMethodBillingDetails;
		customerId: string;
	}

	interface AppleNetworkOptions {
		networks: ApplePayNetworks;
	}

	interface ApplePaymentOptions {
		currencyCode: string;
		countryCode: string;
		requiredBillingAddressFields: ApplePayAddressFields[];
		requiredShippingAddressFields: ApplePayAddressFields[];
		shippingMethods: ApplePayShippingType[];
		shippingType: ApplePayShippingType;
	}

	interface AndroidPaymentOptions {
		total_price: string;
		currency_code: string;
		line_items: AndroidPaymentRequestItem[];
		shipping_address_required: boolean;
		billing_address_required: boolean;
	}

	export interface StripeCardDetails {
		cardId: string; //	The Stripe ID for the card
		brand:
			| "JCB"
			| "American Express"
			| "Visa"
			| "Discover"
			| "Diners Club"
			| "MasterCard"
			| "Unknown";
		funding?: "debit" | "credit" | "prepaid" | "unknown"; // iOS only
		last4: string;
		dynamicLast4: string; // For Apple Pay, this refers to the last 4 digits of the Device Account Number for the tokenized card
		isApplePayCard: boolean;
		expMonth: number; // The card’s expiration month. 1-indexed (i.e. 1 == January)
		expYear: number; //	The card’s expiration year
		country: string; // Two-letter ISO code representing the issuing country of the card
		currency?: string; // This is only applicable when tokenizing debit cards to issue payouts to managed accounts. The card can then be used as a transfer destination for funds in this currency
		name?: string; //	The cardholder’s name
		addressLine1?: string; //	The cardholder’s first address line
		addressLine2?: string; //	The cardholder’s second address line
		addressCity?: string; //	The cardholder’s city
		addressState?: string; //	The cardholder’s state
		addressCountry?: string; //	The cardholder’s country
		addressZip?: string; //	The cardholder’s zip code
	}

	interface StripeBankDetails {
		routingNumber: string; //	The routing number of this account
		accountNumber: string; //	The account number for this BankAccount.
		countryCode: string; //	The two-letter country code that this account was created in
		currency: string; //	The currency of this account
		accountHolderName: string; //	The account holder's name
		accountHolderType: AccountHolderType;
		fingerprint: string; //	The account fingerprint
		bankName: string; //	The name of bank
		last4: string; //	The last four digits of the account number
	}

	interface StripeToken {
		tokenId: string;
		created: number;
		livemode: boolean;
		card?: StripeCardDetails;
		bankAccount?: StripeBankDetails;
		extra?: object;
	}

	export interface ApplePaymentRequestItem {
		label: string;
		amount: string;
		type: "final" | "pending";
	}

	export interface AndroidPaymentRequestItem {
		currency_code: string;
		total_price: string;
		unit_price: string;
		quantity: string;
		description: string;
	}

	export interface CardFormParams {
		requiredBillingAddressFields: "full" | "zip";
		managedAccountCurrency: string;
		smsAutofillDisabled: boolean;
		prefilledInformation: {
			email: string;
			phone: string;
			billingAddress: {
				name: string;
				line1: string;
				line2: string;
				city: string;
				state: string;
				postalCode: string;
				country: string;
				phone: string;
				email: string;
			};
		};
		theme: {
			primaryBackgroundColor: string;
			secondaryBackgroundColor: string;
			primaryForegroundColor: string;
			secondaryForegroundColor: string;
			accentColor: string;
			errorColor: string;
		};
	}

	export interface CardTokenParams {
		number: string;
		expMonth: number;
		expYear: number;
		cvc: string;
		name?: string;
		addressLine1?: string;
		addressLine2?: string;
		addressCity?: string;
		addressState?: string;
		addressZip?: string;
		addressCountry?: string;
		country?: string;
		currency?: string;

		// Android Only
		brand?: string;
		last4?: string;
		fingerprint?: string;
		funding?: string;
	}

	export interface BankAccountParams {
		accountNumber: string;
		countryCode: string;
		currency: string;
		routingNumber: string;
		accountHolderName: string;
		accountHolderType: AccountHolderType;
	}

	export interface SourceParams {
		type: StripeSourceType;
		amount: number;
		name: string;
		returnURL: string;
		statementDescriptor: string;
		currency: string;
		email: string;
		bank: string;
		iban: string;
		addressLine1: string;
		city: string;
		postalCode: string;
		country: string;
		card: string;
	}

	export interface PaymentMethodAddress {
		city: string;
		country: string;
		line1: string;
		line2?: string;
		postalCode: string;
		state: string;
	}
	export interface PaymentMethodBillingDetails {
		address?: PaymentMethodAddress;
		email?: string;
		name?: string;
		phone?: string;
	}

	export interface PaymentMethodCardParams {
		number?: string;
		expMonth?: string | number;
		expYear?: string | number;
		cvc?: string;
		currency?: string;
		name?: string;
		addressLine1?: string;
		addressLine2?: string;
		addressCity?: string;
		addressState?: string;
		addressCountry?: string;
		addressZip?: string;
	}
	export interface PaymentMethodParamsCardByToken {
		token: string;
	}

	export interface CreatePaymentMethodParams {
		card: PaymentMethodCardParams | PaymentMethodParamsCardByToken;
		billingDetails?: PaymentMethodBillingDetails;
		metadata?: object;
	}

	export interface ConfirmSetupIntentParamsCommon {
		clientSecret: string;
		returnURL?: string;
	}

	export type ConfirmSetupIntentParams = ConfirmSetupIntentParamsCommon &
		(
			| { paymentMethodId: string }
			| { paymentMethod: CreatePaymentMethodParams }
		);

	export interface SetupIntentConfirmationResult {
		status: StripeSetupIntentStatus;
		setupIntentId: string;
		paymentMethodId: string;
	}
	export interface PaymentIntentConfirmationResult {
		status: StripePaymentIntentStatus;
		paymentIntentId: string;
		paymentMethodId: string;
	}

	class Stripe {
		static setOptions(options: StripeOptions): Promise<void>;

		/**
		 * Normalizes a card's brand in the format of a short identifier called a 'slug', eg 'amex'
		 * @param brand {string|CardBrandSlug|CardBrandPresentableString}
		 * @returns {CardBrandSlug}
		 */
		static slugForCardBrand(
			brand?: string | CardBrandSlug | CardBrandPresentableString,
		): CardBrandSlug;
		/**
		 * Normalizes a card's brand in the format of a human presentable name, eg 'American Express'
		 * @param brand {string|CardBrandSlug|CardBrandPresentableString}
		 * @returns {CardBrandPresentableString}
		 */
		static presentableStringForCardBrand(
			brand?: string | CardBrandSlug | CardBrandPresentableString,
		): CardBrandPresentableString;

		/**
		 * After calling this, you need to hit your backend with this method to get a clientSecret
		 * @param params
		 */
		static createPaymentMethod(
			params: CreatePaymentMethodParams,
		): Promise<PaymentMethod>;

		static confirmSetupIntent(
			options: ConfirmSetupIntentParams,
		): Promise<SetupIntentConfirmationResult>;

		// TODO:
		// static confirmPaymentIntent(
		// 	options: ConfirmPaymentIntentParams,
		// ): Promise<PaymentIntentConfirmationResult>;

		// static authenticatePaymentIntent(
		// 	options: AuthenticatePaymentIntentParams,
		// ): Promise<PaymentIntentAuthenticationResult>;

		// static authenticateSetupIntent

		static deviceSupportsNativePay(): Promise<boolean>;
		static canMakeNativePayPayments(
			options?: AppleNetworkOptions,
		): Promise<boolean>;

		static potentiallyAvailableNativePayNetworks(): Promise<string[]>;
		static paymentRequestWithNativePay(
			options: ApplePaymentOptions | AndroidPaymentOptions,
			items: ApplePaymentRequestItem[],
		): Promise<string>;
		static completeNativePayRequest(): Promise<void>;
		static cancelNativePayRequest(): Promise<void>;
		static openNativePaySetup(): Promise<void>;

		static paymentRequestWithCardForm(
			params: CardFormParams,
		): Promise<StripeToken>;
		static createTokenWithCard(params: CardTokenParams): Promise<StripeToken>;
		static createTokenWithBankAccount(
			params: BankAccountParams,
		): Promise<StripeToken>;

		static createSourceWithParams(params: SourceParams): Promise<any>;
	}

	export interface PaymentCardTextFieldNativeEvent {
		valid: boolean;
		params: {
			number: string;
			expMonth: number;
			expYear: number;
			cvc: string;
		};
	}
	export interface PaymentCardTextFieldCommonProps {
		expirationPlaceholder?: string;
		numberPlaceholder?: string;
		cvcPlaceholder?: string;
		disabled?: boolean;

		onChange?: (params: PaymentCardTextFieldNativeEvent) => void;

		/** Deprecated */
		onParamsChange?: (
			valid: boolean,
			nativeEventParams: PaymentCardTextFieldNativeEvent["params"],
		) => void;

		style?: StyleProp<ViewStyle & { color?: string }>;
	}
	export interface PaymentCardTextFieldIOSProps {
		cursorColor?: string;
		textErrorColor?: string;
		placeholderColor?: string;
		keyboardAppearance?: "default" | "light" | "dark";
	}
	export interface PaymentCardTextFieldAndroidProps {
		setEnabled?: boolean;
		backgroundColor?: string;
		cardNumber?: string;
		expDate?: string;
		securityCode?: string;
	}

	class PaymentCardTextField extends Component<
		Omit<ViewProps, "style"> &
			PaymentCardTextFieldCommonProps &
			PaymentCardTextFieldIOSProps &
			PaymentCardTextFieldAndroidProps
	> {
		isFocused: () => boolean;
		focus: () => void;
		blur: () => void;
		setParams: (params: CardTokenParams) => void;
	}

	interface StripeNativeErrorDescription<Code extends StripeNativeErrorCode> {
		errorCode: Code | string;
		description?: string;
	}
	export const enum StripeNativeErrorCode {
		busy = "busy",
		cancelled = "cancelled",
		purchaseCancelled = "purchaseCancelled",
		sourceStatusCanceled = "sourceStatusCanceled",
		sourceStatusPending = "sourceStatusPending",
		sourceStatusFailed = "sourceStatusFailed",
		sourceStatusUnknown = "sourceStatusUnknown",
		deviceNotSupportsNativePay = "deviceNotSupportsNativePay",
		noPaymentRequest = "noPaymentRequest",
		noMerchantIdentifier = "noMerchantIdentifier",
		noAmount = "noAmount",
		parseResponse = "parseResponse",
		activityUnavailable = "activityUnavailable",
		playServicesUnavailable = "playServicesUnavailable",
		redirectCancelled = "redirectCancelled",
		redirectNoSource = "redirectNoSource",
		redirectWrongSourceId = "redirectWrongSourceId",
		redirectCancelledByUser = "redirectCancelledByUser",
		redirectFailed = "redirectFailed",

		// Description provided by stripe api
		api = "api",
		apiConnection = "apiConnection",
		redirectSpecific = "redirectSpecific",
		card = "card",
		invalidRequest = "invalidRequest",
		stripe = "stripe",
		rateLimit = "rateLimit",
		authentication = "authentication",
		permission = "permission",
	}
	const errorCodes: {
		[Code in StripeNativeErrorCode]: StripeNativeErrorDescription<Code>;
	};

	export { PaymentCardTextField, errorCodes };

	export default Stripe;
}