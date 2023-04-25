describe('GX2-2192', () => {
	it('TC1', () => {
		//crear nueva lista
		const responseList = TrelloAPI.createNewList();
		cy.get('*').then(() => {
			const newIdList = responseList[0];
			const statusList = responseList[1];
			expect(statusList).to.equal(200);
			//crear nueva carta
			const responseCard = TrelloAPI.createNewCard(newIdList);
			cy.get('*').then(() => {
				const newIdCard = responseCard[0];
				const statusCard = responseCard[1];
				expect(statusCard).to.equal(200);
				//crear nuevo checklist
				const responseCheckList = TrelloAPI.createNewCheckList(newIdCard);
				cy.get('*').then(() => {
					const newIdCheckList = responseCheckList[0];
					const statusCheckList = responseCheckList[1];
					expect(statusCheckList).to.equal(200);
					//crear 4 check items
					const responseCheckItem = TrelloAPI.createNewCheckItem(newIdCheckList);
					const responseCheckItem2 = TrelloAPI.createNewCheckItem(newIdCheckList);
					const responseCheckItem3 = TrelloAPI.createNewCheckItem(newIdCheckList);
					const responseCheckItem4 = TrelloAPI.createNewCheckItem(newIdCheckList);
					//validar que se crearon
					cy.get('*').then(() => {
						const newIdCheckItem = responseCheckItem[0];
						const statusCheckItem = responseCheckItem[1];
						const newIdCheckItem2 = responseCheckItem2[0];
						const statusCheckItem2 = responseCheckItem2[1];
						const newIdCheckItem3 = responseCheckItem3[0];
						const statusCheckItem3 = responseCheckItem3[1];
						const newIdCheckItem4 = responseCheckItem4[0];
						const statusCheckItem4 = responseCheckItem4[1];
						//validar response de la creacion check item 1
						expect(statusCheckItem).to.equal(200);
						//validar response de la creacion check item 2
						expect(statusCheckItem2).to.equal(200);
						//validar response de la creacion check item 3
						expect(statusCheckItem3).to.equal(200);
						//validar response de la creacion check item 4
						expect(statusCheckItem4).to.equal(200);
						// validar que existe check item 1
						const newStatusCheckItem = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem });
						cy.get('*').then(() => {
							expect(newStatusCheckItem.toString()).to.equal('200');
						});
						// validar que existe check item 2
						const newStatusCheckItem2 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem2 });
						cy.get('*').then(() => {
							expect(newStatusCheckItem2.toString()).to.equal('200');
						});
						// validar que existe check item 3
						const newStatusCheckItem3 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem3 });
						cy.get('*').then(() => {
							expect(newStatusCheckItem3.toString()).to.equal('200');
						});
						// validar que existe check item 4
						const newStatusCheckItem4 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem4 });
						cy.get('*').then(() => {
							expect(newStatusCheckItem4.toString()).to.equal('200');
						});
						// cambiar a estado completado checkitem1
						const statusUpdate = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem, idCard: newIdCard, State: 'complete' });
						const state = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem });
						cy.get('*').then(() => {
							//validar response del update check item1
							expect(statusUpdate.toString()).to.equal('200');
							//validar que check item  1 se encuentra en estado completado
							expect(state.toString()).to.equal('complete');
						});
						// cambiar a estado completado checkitem2
						const statusUpdate2 = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem2, idCard: newIdCard, State: 'complete' });
						const state2 = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem2 });
						cy.get('*').then(() => {
							//validar response del update check item2
							expect(statusUpdate2.toString()).to.equal('200');
							//validar que check item 2 se encuentra en estado completado
							expect(state2.toString()).to.equal('complete');
						});
						// cambiar a estado completado checkitem3
						const statusUpdate3 = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem3, idCard: newIdCard, State: 'complete' });
						const state3 = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem3 });
						cy.get('*').then(() => {
							//validar response del update check item3
							expect(statusUpdate3.toString()).to.equal('200');
							//validar que check item 3 se encuentra en estado completado
							expect(state3.toString()).to.equal('complete');
						});
						// cambiar a estado completado checkitem4
						const statusUpdate4 = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem4, idCard: newIdCard, State: 'complete' });
						const state4 = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem4 });
						cy.get('*').then(() => {
							//validar response del update check item4
							expect(statusUpdate4.toString()).to.equal('200');
							//validar que check item 4 se encuentra en estado completado
							expect(state4.toString()).to.equal('complete');
						});
						//cambiar checkitems a estado incomplete
						cy.get('*').then(() => {
							// cambiar a estado incomplete checkitem1
							const statusUpdate = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem, idCard: newIdCard, State: 'incomplete' });
							const state = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem });
							cy.get('*').then(() => {
								//validar response del update check item1
								expect(statusUpdate.toString()).to.equal('200');
								//validar que check item  1 se encuentra en estado incomplete
								expect(state.toString()).to.equal('incomplete');
							});
							// cambiar a estado incomplete checkitem2
							const statusUpdate2 = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem2, idCard: newIdCard, State: 'incomplete' });
							const state2 = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem2 });
							cy.get('*').then(() => {
								//validar response del update check item2
								expect(statusUpdate2.toString()).to.equal('200');
								//validar que check item 2 se encuentra en estado incomplete
								expect(state2.toString()).to.equal('incomplete');
							});
							// cambiar a estado incomplete checkitem3
							const statusUpdate3 = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem3, idCard: newIdCard, State: 'incomplete' });
							const state3 = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem3 });
							cy.get('*').then(() => {
								//validar response del update check item3
								expect(statusUpdate3.toString()).to.equal('200');
								//validar que check item 3 se encuentra en estado incomplete
								expect(state3.toString()).to.equal('incomplete');
							});
							// cambiar a estado incomplete checkitem4
							const statusUpdate4 = TrelloAPI.updateCheckItem({ idCheckItem: newIdCheckItem4, idCard: newIdCard, State: 'incomplete' });
							const state4 = TrelloAPI.getCheckItemState({ idCard: newIdCard, idCheckItem: newIdCheckItem4 });
							cy.get('*').then(() => {
								//validar response del update check item4
								expect(statusUpdate4.toString()).to.equal('200');
								//validar que check item 4 se encuentra en estado incomplete
								expect(state4.toString()).to.equal('incomplete');
							});
						});
						//Delete check items
						//delete check item 1
						const statusDeleteCheckItem1 = TrelloAPI.deleteCheckItem({ idCheckItem: newIdCheckItem, idCard: newIdCard });
						const StatusCheckItem1 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem });
						cy.get('*').then(() => {
							//validar response del delete
							expect(statusDeleteCheckItem1.toString()).to.equal('200');
							//validar que el checkitem no existe
							expect(StatusCheckItem1.toString()).to.equal('404');
						});
						//delete check item 2
						const statusDeleteCheckItem2 = TrelloAPI.deleteCheckItem({ idCheckItem: newIdCheckItem2, idCard: newIdCard });
						const StatusCheckItem2 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem2 });
						cy.get('*').then(() => {
							//validar response del delete
							expect(statusDeleteCheckItem2.toString()).to.equal('200');
							//validar que el checkitem no existe
							expect(StatusCheckItem2.toString()).to.equal('404');
						});
						//delete check item 3
						const statusDeleteCheckItem3 = TrelloAPI.deleteCheckItem({ idCheckItem: newIdCheckItem3, idCard: newIdCard });
						const StatusCheckItem3 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem3 });
						cy.get('*').then(() => {
							//validar response del delete
							expect(statusDeleteCheckItem3.toString()).to.equal('200');
							//validar que el checkitem no existe
							expect(StatusCheckItem3.toString()).to.equal('404');
						});
						//delete check item 1
						const statusDeleteCheckItem4 = TrelloAPI.deleteCheckItem({ idCheckItem: newIdCheckItem4, idCard: newIdCard });
						const StatusCheckItem4 = TrelloAPI.getCheckItem({ idCard: newIdCard, idCheckItem: newIdCheckItem4 });
						cy.get('*').then(() => {
							//validar response del delete
							expect(statusDeleteCheckItem4.toString()).to.equal('200');
							//validar que el checkitem no existe
							expect(StatusCheckItem4.toString()).to.equal('404');
						});
						//delete check list
						const statusDeleteCheckList = TrelloAPI.deleteCheckList({ idCheckList: newIdCheckList });
						const newStatusCheckList = TrelloAPI.getStatusCheckList({ idChecklist: newIdCheckList });
						cy.get('*').then(() => {
							//validar response del delete check list
							expect(statusDeleteCheckList.toString()).to.equal('200');
							//validar que el checklist no existe
							expect(newStatusCheckList.toString()).to.equal('404');
						});
					});
				});
			});
		});
	});
});
import { TrelloAPI } from '@pages/checkItemsApi.Page';
