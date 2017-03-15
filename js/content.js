var showSideBar = function(contacts) {
		var $lnBody = $("body"),
			$container = $("<div/>").attr({id: "ln-contact-chrome-ext-container"}),
			$contactList = $("<ul/>").addClass("ln-contact-chrome-ext-list");

		for (var i = 0; i < contacts.length; i++) {
			var $contact = $("<li/>").addClass("contact-item"),
				$cnDesc = $("<div/>").addClass("description").text(contacts[i].desc),
				$cnID = $("<div/>").addClass("caption").text(contacts[i].id),
				$cnInfo = $("<ul/>").addClass("info");

			for (var j = 0; j < contacts[i].info.length; j++) {
				$cnInfo.append($("<li/>").addClass("contact-info-item").text(contacts[i].info[j]));
			}
			$contact.append($cnDesc, $cnInfo);
			$contactList.append($contact);
		}
		$container.append($contactList);
		$container.appendTo($lnBody);
	},

	collectContactInfo = function() {
		var $_contact_info_sections = $(".right-rail section.pv-contact-info div.section-info section"),
			_contacts = [];

		for (var i = 0; i < $_contact_info_sections.length; i++) {
			var $curSection = $_contact_info_sections.eq(i),
				elClasses = $curSection.attr("class").split(" "),
				desc = $curSection.find("header.pv-contact-info__header").text().trim(),
				$info = $curSection.find("div.pv-contact-info__ci-container"),
				id = "none",
				info = [];

			if (elClasses.length > 1) {
				id = elClasses[1];
				id = (id.indexOf("ci-") > -1) ? id.slice(3) : id;
			}

			if ($info.length === 0) {
				var $infoContainer = $curSection.find("ul.pv-contact-info__list"),
					$infoItems = $infoContainer.find("li.pv-contact-info__ci-container");

				for (var j = 0; j < $infoItems.length; j++) {
					info.push($infoItems.eq(j).text().trim());
				}
			} else {
				info.push($info.text().trim());
			}

			_contacts.push({
				id: id,
				desc: desc,
				info: info
			});
		}
		showSideBar(_contacts);
	},
	loadTimer = setInterval(function() {
		if ($(".right-rail section.pv-contact-info button.contact-see-more-less").length > 0) {
			if ($(".right-rail section.pv-contact-info div.section-info section").length > 0) {
				clearInterval(loadTimer);

				collectContactInfo();
			} else {
				$(".right-rail section.pv-contact-info button.contact-see-more-less").click();
			}
		}
	});